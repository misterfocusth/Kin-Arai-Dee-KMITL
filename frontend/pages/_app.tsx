import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { Liff } from "@line/liff";
import { useState, useEffect } from "react";
import { Loader } from "@mantine/core";

function MyApp({ Component, pageProps }: AppProps) {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    import("@line/liff")
      .then((liff) => liff.default)
      .then((liff) => {
        console.log("LIFF: Initializing LIFF App");
        liff
          .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! })
          .then(() => {
            console.log("LIFF: Initializing LIFF App");
            setLiffObject(liff);
            setIsLoading(false);
          })
          .catch((error: Error) => {
            console.log("LIFF: Initializing LIFF App");
            console.log(error.toString());
          });
      });
  }, []);

  pageProps.liff = liffObject;
  pageProps.liffError = liffError;

  if (isLoading) {
    return (
      <div className="flex min-h-screen min-w-screen justify-center items-center">
        <Loader color="#FED634" size="xl" variant="dots" />
      </div>
    );
  } else {
    return <Component {...pageProps} />;
  }
}

export default MyApp;
