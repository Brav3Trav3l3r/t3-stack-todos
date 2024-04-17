import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import db from "../db/drizzle";
import { library } from "../db/schema";
import { protectedProcedure, router } from "../trpc";

export const libraryRouter = router({
  updateStatus: protectedProcedure
    .input(
      z.object({
        media_id: z.string(),
        media_status: z.enum(["completed", "watchlist", "watching"]),
      })
    )
    .mutation(async ({ input }) => {
      await db
        .update(library)
        .set({ media_status: input.media_status })
        .where(eq(library.media_id, input.media_id));
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const media = await db
      .select()
      .from(library)
      .where(eq(library.user_id, ctx.auth.userId))
      .orderBy(desc(library.added_at));

    return media;
  }),
  get: protectedProcedure
    .input(z.object({ media_id: z.string() }))
    .query(async (opts) => {
      const { input } = opts;

      const row = await db
        .select()
        .from(library)
        .where(
          and(
            eq(library.media_id, input.media_id),
            eq(library.user_id, opts.ctx.auth.userId)
          )
        );

      return row;
    }),
  add: protectedProcedure
    .input(
      z.object({
        media_id: z.string(),
        type: z.string().nullable(),
        image: z.string(),
        title_english: z.string().nullable().optional(),
        title_native: z.string().nullable().optional(),
        title_romaji: z.string().nullable().optional(),
        media_status: z
          .enum(["completed", "watchlist", "watching"])
          .default("watchlist")
          .optional(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      await db.insert(library).values({
        user_id: opts.ctx.auth.userId,
        image: input.image,
        media_id: input.media_id,
        type: input.type,
        title_engish: input.title_english,
        title_native: input.title_native,
        title_romaji: input.title_romaji,
        media_status: input.media_status,
      });
    }),
  remove: protectedProcedure
    .input(z.object({ media_id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await db
        .delete(library)
        .where(
          and(
            eq(library.user_id, ctx.auth.userId),
            eq(library.media_id, input.media_id)
          )
        );
    }),
});
