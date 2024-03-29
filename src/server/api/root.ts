import { TweetRouter } from "~/server/api/routers/tweet";
import { createTRPCRouter } from "~/server/api/trpc";
import { ProfileRouter } from "./routers/profile";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  tweet: TweetRouter,
  profile: ProfileRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
