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
  types: { type: { name: string } }[]
  sprites: {
    front_default: string;
  };
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<Pokemon[], void>({
      query: () => 'pokemon/',
    }),
    getPokemonDetails: builder.query<PokemonDetails, number>({
      query: (id) => `pokemon/${id}/`,
    }),
  }),
});

export const { useGetPokemonListQuery, useLazyGetPokemonDetailsQuery } = pokemonApi;
