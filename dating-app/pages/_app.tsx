import "../styles/globals.css";
import "../styles/register.css";
import type { AppProps } from "next/app";
import "../styles/logo.css";
import "../styles/card.css";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.addEventListener("mousemove", (a: any) => {
      let body = document.querySelector("body");
      let span = document.createElement("span");
      let x = a.offsetX;
      let y = a.offsetY;
      span.style.right = y + "px";
      span.style.left = x + "px";
      let size = Math.random() * 20;
      span.style.height = 2 + size + "px";
      span.style.width = 2 + size + "px";
      body?.appendChild(span);
      setTimeout(() => {
        span.remove();
      }, 500);
    });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
