import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '../../../server/routers/_app'
import { NextRequest } from 'next/server'
import { createTRPCContext } from '@/server/context'

export const config = {
  runtime: 'edge',
}

// export API handler
export default async function handler(req: NextRequest) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    router: appRouter,
    req,
    createContext: createTRPCContext,
  })
}
