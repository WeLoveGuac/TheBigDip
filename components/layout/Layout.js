import Header from "./Header";
import Footer from "./Footer";

import Head from "next/head";
import { ToastContainer } from 'react-toastify';

const Layout = ({ children, title, description, ogImage, url }) => {
  // website Url
  const pageUrl =
    "https://twitter.com/justbluechips";
  // when you share this page on facebook you'll see this image
  const ogImg = "favicon.ico";
  return (
    <>
      <Head>
        <title>
          {title
            ? title
            : "Template - Next.js and Material-UI with Header and Footer"}
        </title>
        <meta
          name="description"
          key="description"
          content={
            description
              ? description
              : "This is a Template using Next.js and Material-UI with Header and Footer."
          }
        />
        <meta
          property="og:title"
          content={
            title
              ? title
              : "Template - Next.js and Material-UI with Header and Footer"
          }
          key="og:title"
        />
        <meta property="og:url" content={url ? url : pageUrl} key="og:url" />
        <meta
          property="og:image"
          content={ogImage ? ogImage : ogImg}
          key="og:image"
        />
        <meta
          property="og:description"
          content={
            description
              ? description
              : "This is a Template using Next.js and Material-UI with Header and Footer."
          }
          key="og:description"
        />
      </Head>
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
      <ToastContainer />
      <style jsx global>
        {`
          html,
          body {
            background: #974a26 !important;
            overflow-x: hidden;
            padding: 0 !important;
            color: #000 !important;
            font-family: "BreviaBold", sans-serif;
          }
          #__next {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          main {
            flex: 1;
          }
          .Toastify__toast-container {
            z-index: 200000;
          }
        `}
      </style>
    </>
  );
};

export default Layout;
