import { SignedInAuthObject, SignedOutAuthObject } from '@clerk/nextjs/dist/api'
import { initTRPC, TRPCError } from '@trpc/server'

import { Context } from './context'

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  errorFormatter({ shape }) {
    return shape
  },
})

// check if the user is signed in, otherwise through a UNAUTHORIZED CODE
const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({
    ctx: {
      auth: ctx.auth,
    },
  })
})

// Base router and procedure helpers
export const createTRPCRouter = t.router

/**
 * Public (unauthed) procedure
 *
 * This is the base piece you use to build new queries and mutations on your
 * tRPC API. It does not guarantee that a user querying is authorized, but you
 * can still access user session data if they are logged in
 */
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthed)
