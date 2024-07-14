import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import email from "next-auth/providers/email";

export const authOptions = {
  providers: [
    GoogleProvider({}),
    CredentialProvider({
      id: "credentials_email_password",
      name: "Credentials",
      async authorize(credentials) {
        try {
          // test return
          return {
            email: "clivemaina41@gmail.com",
            id: "random-uuid",
            name: "clive",
          };
          const auth_response = await fetch(``, {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          })
            .then((res) => res.json())
            .then((res) => res?.data ?? null);
          console.log("auth_response", auth_response);

          return { ...auth_response };
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // @ts-ignore
    async jwt({ token, user, trigger, session }) {
      // console.log("TOKEN", token);
      // console.log("USER", user);
      if (user) {
        token = {
          ...token,
          ...user,
        };
      }

      console.log("token", token);
      if (trigger == "update") {
        token = {
          ...session?.user,
        };
      }

      return token;
    },
    // @ts-ignore
    async session({ session, token, user }) {
      Object.keys(token).forEach((key) => {
        session.user[key] = token[key];
      });
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET ?? "__",
};
