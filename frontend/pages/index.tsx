import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import BottomNavigationBar from "../components/BottomNavigationBar";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>หน้าแรก | Kin Arai Dee (@KMITL)</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex min-h-screen min-w-screen flex-col items-center py-2">
          <div className="w-full fixed bottom-0 px-2 pb-1">
            <BottomNavigationBar />
          </div>
        </div>
      </main>

      {/* <footer>
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer> */}
    </div>
  );
};

export default Home;
