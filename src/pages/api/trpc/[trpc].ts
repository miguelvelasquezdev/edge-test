import * as trpcNext from "@trpc/server/adapters/next";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "../../../server/routers/_app";
import { createContext } from "../../../server/context";
import { NextRequest, NextResponse } from "next/server";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { prisma } from "../../../server/db";

// export const config = {
//   runtime: "edge",
// };

// // export API handler
// export default async function handler(req: NextRequest) {
//   return fetchRequestHandler({
//     endpoint: "/api/trpc",
//     router: appRouter,
//     req,
//     createContext,
//   });
// }

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: () => ({ prisma }),
});
