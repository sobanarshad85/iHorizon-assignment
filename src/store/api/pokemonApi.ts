import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDetails {
  name: string;
  height: number;
  id: number;
  weight: number;
  types: { type: { name: string } }[];
  sprites: {
    front_default: string;
  };
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),
  endpoints: (builder) => {
    return {
      getPokemonList: builder.query<any, number>({
        query: (offset = 0) => `pokemon?offset=${offset * 30}&limit=30`,
      }),

      getPokemonDetails: builder.query<PokemonDetails, number>({
        query: (id) => `pokemon/${id}/`,
      }),
    };
  },
});

export const { useLazyGetPokemonDetailsQuery, useLazyGetPokemonListQuery } = pokemonApi;
