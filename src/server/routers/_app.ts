import { z } from 'zod'
import { publicProcedure, protectedProcedure, createTRPCRouter } from '../trpc'
import { prisma } from '../db'

export const appRouter = createTRPCRouter({
  createUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const existsUser = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
      })
      if (existsUser) return
      const user = await prisma.user.create({
        data: {
          id: input.id,
          name: input.name,
          email: input.email,
        },
      })
      return user
    }),
  createPost: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.auth.userId) return
      const post = await prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          author: { connect: { id: ctx.auth.userId } },
        },
      })
      return post
    }),
  getMyPosts: protectedProcedure.query(async ({ ctx }) => {
    const posts = await prisma.post.findMany({
      where: {
        authorId: ctx.auth.userId,
      },
    })
    return posts
  }),
})

// export type definition of API
export type AppRouter = typeof appRouter
