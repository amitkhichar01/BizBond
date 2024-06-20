import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import SessionWrapper from "@/SessionWrapper";

const inter = Inter({
    subsets: ["latin"],
});

export const metadata = {
    title: "BizBond",
    description: "Welcome to your professional community",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content="LinkedIn clone, professional community, BizBond, networking" />
                <meta name="author" content="Amit Khichar" />
                <meta property="og:title" content={metadata.title} />
                <meta property="og:description" content={metadata.description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://bizbond.onrender.com/" />
            </Head>
            <body className={inter.className}>
                <SessionWrapper>{children}</SessionWrapper>
            </body>
        </html>
    );
}
