import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/config/prismadb.config";
import { Adapter } from "next-auth/adapters";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "consent",
          response_type: "code",
          access_type: "offline",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      // @ts-ignore
      console.log(profile.picture);
      const userExist = await prisma.user.findUnique({
        where: { email: profile?.email },
      });
      if (!userExist) {
        // Truncate user name if too long
        const userName = profile?.name?.slice(0, 20) as string;
        await prisma.user.create({
          data: {
            email: profile?.email!,
            // @ts-ignore
            image: profile?.picture!,
            userName,
          },
        });
      }
      return true;
    },

    async session({ session }) {
      const user = await prisma.user.findUnique({
        where: {
          email: session.user?.email!,
        },
      });

      // @ts-ignore
      session.user.id = user?.id!.toString();
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
