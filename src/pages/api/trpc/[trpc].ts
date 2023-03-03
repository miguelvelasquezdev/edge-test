import * as trpcNext from "@trpc/server/adapters/next";
import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { appRouter } from "../../../server/routers/_app";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextResponse } from "next/server";
export const config = {
  runtime: "edge",
};

// export API handler
// @see https://trpc.io/docs/api-handler
export default async function handler(req: NextRequest, res: NextResponse) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    router: appRouter,
    req,
    createContext: () => ({}),
  });
}
