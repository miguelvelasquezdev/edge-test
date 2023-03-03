import { z } from 'zod'
import { publicProcedure, protectedProcedure, createTRPCRouter } from '../trpc'
import { prisma } from '../db'

export const appRouter = createTRPCRouter({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text}`,
      }
    }),
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const searchedUser = await prisma.user.findUnique({ where: { email: input.email } })
      if (searchedUser) return
      const user = await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
        },
      })
      return user
    }),
  getAllUsers: protectedProcedure.query(async () => {
    return await prisma.user.findMany()
  }),
})

// export type definition of API
export type AppRouter = typeof appRouter
