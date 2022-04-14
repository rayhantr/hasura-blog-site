import Head from "next/head";
import Link from "next/link";
import React from "react";

function AuthLayout({ title, children }) {
	return (
		<>
			<Head>
				<title>Blog | {title}</title>
				<meta name="description" content="Login or Register to blog post system" />
				<meta name="keywords" content="blogs, articles, posts, login, register, authentication" />
				<meta name="author" content="MD Rayhan Talukder" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<div className="min-h-screen bg-gradient-primary flex flex-col">
				<header className="text-center text-white py-4 text-4xl font-bold">
					<Link href="/">BLOG</Link>
				</header>
				<main className="w-full flex-auto flex justify-center items-center">
					<div className="md:-mt-20 mb-5 md:mb-0">{children}</div>
				</main>
			</div>
		</>
	);
}

export default AuthLayout;
