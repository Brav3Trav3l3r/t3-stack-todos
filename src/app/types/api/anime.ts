import { z } from "zod";

export const character = z.object({
  id: z.number(),
  role: z.string(),
  name: z.object({
    full: z.string(),
    native: z.string(),
    userPreferred: z.string(),
  }),
  image: z.string(),
});

export const relation = z.object({
  id: z.number(),
  malId: z.number(),
  relationType: z.string(),
  title: z.object({
    romaji: z.string(),
    english: z.string(),
    native: z.string().optional(),
    userPreferred: z.string(),
  }),
  status: z.string(),
  episodes: z.number().nullable(),
  image: z.string(),
  cover: z.string(),
  rating: z.number().nullable(),
  type: z.string().optional(),
});

export const anime = z.object({
  id: z.union([z.number(), z.string()]),
  image: z.string(),
  episodeNumber: z.number().optional(),
  totalEpisodes: z.number(),
  title: z.object({
    romaji: z.string(),
    english: z.string(),
    native: z.string().optional(),
    userPreferred: z.string(),
  }),
  cover: z.string(),
  type: z.string(),
  releaseDate: z.number().optional(),
  startDate: z
    .object({
      year: z.number().nullable(),
      month: z.number().nullable(),
      day: z.number().nullable(),
    })
    .optional(),
  endDate: z
    .object({
      year: z.number().nullable(),
      month: z.number().nullable(),
      day: z.number().nullable(),
    })
    .optional(),
  description: z.string(),
  rating: z.number().nullable(),
  nextAiringEpisode: z
    .object({
      airingTime: z.number().nullable(),
      timeUntilAiring: z.number().nullable(),
      episode: z.number().nullable(),
    })
    .optional(),
  duration: z.number().nullable().optional(),
  studios: z.array(z.string()),
  genres: z.array(z.string()),
  status: z.string().nullable().optional(),
  season: z.string().nullable(),
  synonyms: z.array(z.string()).optional(),
  characters: z.array(character),
  relations: z.array(relation),
});

export const animeResponse = z.object({
  results: z.array(anime),
});
