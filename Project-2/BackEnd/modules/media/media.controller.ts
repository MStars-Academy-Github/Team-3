import { Request, Response } from "express";
import { User } from "../user";
import * as mediaServices from "./media.services";
import formidable, { Fields } from "formidable";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";
import { Media } from ".";
import fs from "fs";
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
    const user = await User.findById("630ef583ac9a86b055977e31");

    let media = new Media(fields);
    media.postedBy = user?.id;
    const file = files["media"];
    console.log(fields);

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
  try {
    const media = await Media.findById(mediaId)
      .populate("postedBy", "_id firstName lastName")
      .exec();
    let files = await gridfs
      .find({ filename: media?._id.toString() })
      .toArray();
    console.log(files);

    res.json({
      data: media,
      file: files,
    });
  } catch (error) {
    res.status(404).json({
      error: "could not retrieve media file",
    });
  }
};

export const getMediaByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log(userId);

  try {
    const media = await Media.find({ postedBy: userId });
    res.status(200).json({ data: media });
  } catch (error) {
    res.status(404).json({
      error: "could not retrieve media file",
    });
  }
};
