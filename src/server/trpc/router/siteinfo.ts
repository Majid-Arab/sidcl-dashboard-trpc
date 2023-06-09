import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const siteInfoRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.site_info.findMany();
  }),
  paginated: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(), // <-- "cursor" needs to exist, but can be any type
      })
    )
    .query(async ({ input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;
      const items = await prisma?.site_info.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        // where: {
        //   title: {
        //     contains: 'Prisma' /* Optional filter */,
        //   },
        // },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: "desc",
        },
        include: {
          client: true,
          invoice_status: true,
          po_num: true,
          project_name: true,
          site_info_files: true,
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;

      const totalDocs = await prisma?.site_info.count();

      if (items!.length > limit) {
        const nextItem = items!.pop();
        nextCursor = nextItem!.id;
      }
      return {
        items,
        totalDocs,
        nextCursor,
      };
    }),
  add: publicProcedure
    .input(
      z.object({
        site_id: z.string(),
        client_id: z.number(),
        project_name_id: z.number(),
        // surveyour_name: z.string(),
        // date: z.(),
        // description: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const site = await prisma?.site_info.create({
        data: {
          site_id: input.site_id,
          client_id: input.client_id,
          project_name_id: input.project_name_id,
          // surveyour_name: input.,
          // date: input.,
          // description: input.,
        },
      });
      return {
        message: "Site created successfully",
        data: site,
      };
    }),

  edit: publicProcedure
    .input(
      z.object({
        id: z.number(),
        site_id: z.string(),
        client_id: z.number(),
        project_name_id: z.number(),
        // surveyour_name: z.string(),
        // date: z.(),
        // description: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      console.log(input)
      try {
        const site = await prisma?.site_info.update({
          where: {
            id: input.id
          },
          data: {
            site_id: input.site_id,
            client_id: input.client_id,
            project_name_id: input.project_name_id,
            // surveyour_name: input.,
            // date: input.,
            // description: input.,
          },
        });
        return {
          message: "Site updated successfully",
          data: site,
        };
      } catch (error) {
        console.log(error)
      }

    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const deleteUser = await prisma?.site_info.delete({
        where: {
          id: input.id,
        },
      });
      return {
        message: "Site deleted successfully",
        data: deleteUser,
      };
    }),
});
