import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/SessionWrapper";

const inter = Inter({
    subsets: ["latin"],
});

export const metadata = {
    title: "BizBond",
    description: "Welcome to your professional community",
    keywords: ["LinkedIn clone", "professional community", "BizBond", "networking"],
    authors: [{ name: "Amit Khichar" }],
    openGraph: {
        title: "BizBond",
        description: "Welcome to your professional community",
        type: "website",
        url: "https://bizbond.onrender.com/",
    },
};

export const viewport = "width=device-width, initial-scale=1";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionWrapper>{children}</SessionWrapper>
            </body>
        </html>
    );
}
