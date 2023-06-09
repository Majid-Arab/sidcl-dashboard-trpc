import { router } from "../trpc";
import { exampleRouter } from "./example";
import { siteInfoRouter } from "./siteinfo";

export const appRouter = router({
  example: exampleRouter,
  siteinfo:siteInfoRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
