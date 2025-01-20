import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    console.log("authCallback invoked");
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    console.log("user retrieved:", user);
    if (!user || !user.id || !user.email) {
      console.log("Unauthorized user");
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    // check if the user is in the database
    console.log("Checking if user exists in DB:", user.id);
    const dbUser = await db.user
      .findFirst({
        where: {
          id: user.id,
        },
      })
      .catch((error) => {
        console.error("Error querying the database:", error);
      });
    console.log("dbUser:", dbUser);

    if (!dbUser) {
      console.log("User does not exist, creating user...");
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
        },
      });
      console.log("User created successfully");
    }

    return { success: true };
  }),
});

export type AppRouter = typeof appRouter;
