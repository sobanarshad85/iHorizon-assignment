import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

interface PokemonState {
  pokemonList: any[];
  pokemonDetails: any;
}

const initialState: PokemonState = {
  pokemonList: [],
  pokemonDetails: null,
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    fetchPokemonList: (state, action: PayloadAction<any[]>) => {
      state.pokemonList = action.payload;
    },
    fetchPokemonDetails: (state, action: PayloadAction<any>) => {
      state.pokemonDetails = action.payload;
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
