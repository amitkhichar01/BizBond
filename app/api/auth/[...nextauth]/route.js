import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/lib/auth";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export const authOptions = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const { email, password } = credentials;

                try {
                    await dbConnect();
                    const user = await User.findOne({ email });
                    if (!user) {
                        throw new Error("Email not found");
                    }

                    // Verify password
                    const isValid = await verifyPassword(password, user.password);
                    if (!isValid) {
                        throw new Error("Password does not match the email");
                    }

                    // Return user object if credentials are valid
                    return Promise.resolve(user);
                } catch (error) {
                    console.error("Authentication error:", error.message);
                    throw new Error(error.message);
                }
            },
        }),
    ],
    pages: {
        signOut: "https://bizbond.onrender.com",
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { authOptions as GET, authOptions as POST };
