import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FaPenNib } from "react-icons/fa";
import Header from "./Header";
import { useAuthenticated } from "@nhost/nextjs";

function MainLayout({ title, children }) {
  const router = useRouter();
  const isAuthenticated = useAuthenticated();

  const showTitle = title ? "Hasura Blog - " + title : "Hasura Blog";
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{showTitle}</title>
        <meta name="description" content="Blog post system" />
        <meta name="keywords" content="blogs, articles, posts" />
        <meta name="author" content="MD Rayhan Talukder" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <main className="flex-auto">{children}</main>
      <footer className="text-center p-3 text-slate-400">© Copyright Blog System</footer>
      {router.asPath !== "/create" && isAuthenticated && (
        <Link href="/create">
          <a className="fixed bottom-6 right-6 md:bottom-10 md:right-10 rounded-full p-4 text-2xl shadow-md bg-sky-200 text-sky-700">
            <FaPenNib />
          </a>
        </Link>
      )}
    </div>
  );
}

export default MainLayout;
