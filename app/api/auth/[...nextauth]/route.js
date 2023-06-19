import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            }); 
            session.user.id = await sessionUser._id.toString();
            return session;
        },
        async signIn({ profile }) {
            try {
                // every nextjs function is serverless. that means it is Lambda function  that is executed only when it is called-> dynamodb
                await connectToDB();
                // check if a user already exists
                const userExists = await User.findOne({
                    email: profile.email
                });
                // if not, create a new user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    });
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    }
})

export { handler as GET, handler as POST };
