import { Request, Response } from "express";
import { User } from "../user";
import * as mediaServices from "./media.services";
import formidable, { Fields } from "formidable";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";
import { Media } from ".";
import fs from "fs";
import { IMedia } from "./media.interfaces";
let gridfs: GridFSBucket;
mongoose.connection.on("connected", () => {
  gridfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
});

export const createMedia = async (req: Request, res: Response) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err: Error, fields: Fields, files: any) => {
    if (err) {
      res.status(400).json({
        error: "video could not uploaded",
      });
    }
    const user = await User.findById(fields.userId);
    console.log(fields);
    let media = new Media(fields);
    media.postedBy = user?.id;
    const file = files["media"];

    // save the parsed file
    if (file) {
      let writeStream = gridfs.openUploadStream(media._id.toString(), {
        contentType: "binary/octet-stream",
      });
      fs.createReadStream(file.filepath).pipe(writeStream);
    }

    try {
      let result = await media.save();
      res.status(200).json({ data: result });
    } catch (err) {
      return res.status(400).json({
        err: "error during file upload",
      });
    }
  });
};

export const getMediaById = async (req: Request, res: Response) => {
  const { mediaId } = req.params;
  const range = req.headers["range"];

  try {
    const media = await Media.findById(mediaId)
      .populate("postedBy", "_id firstName lastName")
      .exec();
    let files = await gridfs
      .find({ filename: media?._id.toString() })
      .toArray();
    let file = files[0];

    if (range && typeof range === "string") {
      const parts = range.replace(/bytes=/, "").split("-");
      const partialStart = parts[0];
      const partialEnd = parts[1];
      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : file.length - 1;
      const chunkSize = end - start + 1;
      res.writeHead(206, {
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize.toString(),
        "Content-Range": "bytes " + start + "-" + end + "/" + file.length,
        "Content-Type": file.contentType,
      });
      let downloadstream = gridfs.openDownloadStream(file._id, {
        start,
        end: end + 1,
      });
      downloadstream.pipe(res);
      downloadstream.on("error", () => {
        res.sendStatus(404);
      });
      downloadstream.on("end", () => {
        res.end();
      });
    } else {
      res.header("Content-Length", file.length.toString());
      res.header("Content-Type", file.contentType);
      let downloadstream = gridfs.openDownloadStream(file._id);
      downloadstream.pipe(res);
      downloadstream.on("error", () => {
        res.sendStatus(404);
      });
      downloadstream.on("end", () => {
        res.end();
      });
    }
  } catch (error) {
    res.status(404).json({
      error: "could not retrieve media file",
    });
  }
};
export const MediaById = async (req: Request, res: Response) => {
  const { _id } = req.params;
  console.log(_id, "----------");

  const body: any = await Media.findById(_id);
  console.log(body, "+++++++");

  try {
    const media = await Media.findOne({ _id: body._id });
    res.status(200).json({ data: media, success: "amjilltai" });
  } catch (error) {
    res.status(404).json({
      error: "could not retrieve media file",
    });
  }
};

export const getMediaByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  // console.log(userId);
  try {
    const media = await Media.find({ postedBy: userId });
  } catch (error) {
    res.status(404).json({
      error: "could not retrieve media file",
    });
  }
};

export const getAllMedia = async (req: Request, res: Response) => {
  try {
    const allMedia = await Media.find();
    // console.log(allMedia);
    res.status(200).json({ data: allMedia });
  } catch (error) {
    res.status(404).json({
      error: "could not retrieve media file",
    });
  }
};

export const updateMedia = async (req: Request, res: Response) => {
  const { _id } = req.params;
  const { title, description, genre, thumbImg } = req.body;
  const body: any = await Media.findById(_id);
  try {
    const updatedMedia = await Media.updateOne(
      { _id: body._id },
      {
        $set: {
          title: title,
          description: description,
          genre: genre,
          thumbImg: thumbImg,
        },
      }
    );
    // console.log(_id);
    // console.log(req.body);
    // console.log(updatedMedia);

    res.status(200).json({ data: updatedMedia, success: "amjilttai" });
  } catch (error) {
    res.status(404).json({
      error: "could not retrieve media file",
    });
  }
};

export const deleteMedia = async (req: Request, res: Response) => {
  const _id = req.params;
  // console.log(_id, "----------------");

  const body: any = await Media.findById(_id);
  // console.log(body, "+++++++++++++++++++");

  try {
    if (body) {
      const mediaDelete = await Media.deleteOne({ _id: body._id });
      res.status(200).json({ data: mediaDelete, success: "amjilltai" });
      // console.log(deletedMedia);
    }
  } catch (error) {
    res.status(404).json({
      error: "could not retrieve media file",
    });
  }
};
