import "../styles/globals.css";
import "../styles/register.css";
import type { AppProps } from "next/app";
import "../styles/logo.css";
import "../styles/card.css";
import Login from "../components/Login";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
type User = {
  name: String;
  id: String;
  age: Number;
  email: String;
};
function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>();
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user") || ""));
      window.location.reload;
    }
  }, []);
  console.log(user);
  return <>{user ? <Component {...pageProps} /> : <Login />}</>;
}

export default MyApp;
