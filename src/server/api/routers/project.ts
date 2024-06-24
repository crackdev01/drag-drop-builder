import { z } from "zod";
import { projectSchema } from "~/schemas/project";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  create: publicProcedure
    .input(projectSchema)
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.project.create({
        data: {
          name: input.name,
          description: input.description,
        },
      });
    }),

  getList: publicProcedure.query(({ ctx }) => {
    return ctx.db.project.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
  getById: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.db.project.findUnique({
      where: {
        id: input,
      },
    });
  }),
  updateContent: publicProcedure
    .input(z.object({ id: z.number(), jsonElements: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.project.update({
        where: {
          id: input.id,
        },
        data: {
          content: input.jsonElements,
        },
      });
    }),
  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return ctx.db.project.delete({
      where: {
        id: input,
      },
    });
  }),
});
