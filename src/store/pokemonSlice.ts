import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

type PokemonDetails = {
  [id: string]: any;
};

interface PokemonState {
  pokemonList: any[];
  pokemonDetails: PokemonDetails;
}

const initialState: PokemonState = {
  pokemonList: [],
  pokemonDetails: {},
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    fetchPokemonList: (state, action: PayloadAction<any[]>) => {
      state.pokemonList = action.payload;
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

export const selectPokemonList = (state: RootState) =>
  state.pokemon.pokemonList;
export const selectPokemonDetails = (state: RootState) =>
  state.pokemon.pokemonDetails;

export default pokemonSlice.reducer;
