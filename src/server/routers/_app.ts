import { z } from "zod";
import { procedure, router } from "../trpc";
import { prisma } from "../db";

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text}`,
      };
    }),
  createUser: procedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
      })
    )
    .query(async ({ input }) => {
      const user = await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
        },
      });
      return user;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
