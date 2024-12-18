import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/app/(backend)/api/middleware/auth";
import User from "@/app/(backend)/api/models/User";
import dbConnect from "@/app/(backend)/api/middleware/dbConnect";

const authOptions = {
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
                        console.error("Email not found");
                        throw new Error("Email not found");
                    }

                    // Verify password
                    const isValid = await verifyPassword(password, user.password);

                    if (!isValid) {
                        console.error("Password does not match the email");
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
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            if (account?.provider === "google" && profile) {
                await dbConnect();

                let existingUser = await User.findOne({ email: profile.email });

                if (!existingUser) {
                    existingUser = await User.create({
                        email: profile.email,
                        name: profile.name,
                        profile_url: profile.picture,
                    });
                } else {
                    existingUser.name = profile.name;
                    existingUser.profile_url = profile.picture;

                    await existingUser.save();
                }

                token.id = existingUser._id;
                token.profile_url = existingUser.profile_url;
            } else if (user) {
                token.id = user._id;
                token.profile_url = user.profile_url;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.profile_url = token.profile_url;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
