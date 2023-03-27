import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { Pokemon, PokemonDetails } from './api/pokemonApi';

interface PokemonState {
  pokemonList: Array<Pokemon>;
  pokemonDetails: PokemonDetails | object;
}

const initialState: PokemonState = {
  pokemonList: [],
  pokemonDetails: {},
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    fetchPokemonList: (state, action: PayloadAction<Array<Pokemon>>) => {
      state.pokemonList = action.payload;
    },
    fetchPokemonDetails: (state, action: PayloadAction<PokemonDetails>) => {
      const _pokemonDetails = { ...state.pokemonDetails };
      if (action.payload?.id) {
        _pokemonDetails[action.payload.id] = action.payload;
      }
      state.pokemonDetails = _pokemonDetails;
    },
  },
});

export const {
  fetchPokemonList,
  fetchPokemonDetails,
} = pokemonSlice.actions;

export const selectPokemonList = (state: RootState) => state.pokemon.pokemonList;
export const selectPokemonDetails = (state: RootState) => state.pokemon.pokemonDetails;

export default pokemonSlice.reducer;
