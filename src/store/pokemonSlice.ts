import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

type PokemonDetails = {
  [id: string]: any;
};

interface PokemonState {
  pokemonList: any[];
  pokemonDetails: PokemonDetails;
  offset: number;
  next: null | string
}

const initialState: PokemonState = {
  pokemonList: [],
  pokemonDetails: {},
  offset: 0,
  next: null
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    fetchPokemonList: (state, action: PayloadAction<{ result: any[], next: string | null }>) => {
      state.pokemonList = state.pokemonList.length == 0 ? action.payload.result : [...state.pokemonList, ...action.payload.result];
      state.next = action.payload.next;
      state.offset = state.offset + 1
    },
    fetchPokemonDetails: (state, action: PayloadAction<any>) => {
      const { id, ...pokemonData } = action.payload;
      if (id) {
        state.pokemonDetails[id] = { id, ...pokemonData };
      }
    },
  },
});

export const { fetchPokemonList, fetchPokemonDetails } = pokemonSlice.actions;

export const getPokemonList = (state: RootState) =>
  state.pokemon.pokemonList;
export const getPokemonsDetails = (state: RootState) =>
  state.pokemon.pokemonDetails;
export const getOffset = (state: RootState) =>
  state.pokemon.offset;
export const getNext = (state: RootState) =>
  state.pokemon.next;

export default pokemonSlice.reducer;
