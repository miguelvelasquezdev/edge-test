import * as trpc from '@trpc/server'
import { getAuth } from '@clerk/nextjs/server'
import type { SignedInAuthObject, SignedOutAuthObject } from '@clerk/nextjs/dist/api'

import { prisma } from './db'

interface AuthContext {
  auth: SignedInAuthObject | SignedOutAuthObject
}

const createInnerTRPCContext = ({ auth }: AuthContext) => {
  return {
    auth,
    prisma,
  }
}

export const createTRPCContext = async (opts: any) => {
  return createInnerTRPCContext({ auth: getAuth(opts.req) })
}

export type Context = trpc.inferAsyncReturnType<typeof createTRPCContext>
