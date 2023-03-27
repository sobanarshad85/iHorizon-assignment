import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {NavigationContext} from '@react-navigation/native';
import {RootState} from '../src/store';
import PokemonList from '../src/components/PokemonListItem';
import {Pokemon} from '../src/store/api/pokemonApi';
import {fetchPokemonList} from '../src/store/pokemonSlice';

describe('PokemonList', () => {
  const navigation = {} as any;
  const dispatch = jest.fn();
  const pokemonList = [
    {name: 'pokemon1'} as Pokemon,
    {name: 'pokemon2'} as Pokemon,
  ];
  const pokemonDetails = {
    1: {sprites: {front_default: 'image1'}},
    2: {sprites: {front_default: 'image2'}},
  };
  const mockRootState: RootState = {
    pokemon: {
      list: pokemonList,
      details: pokemonDetails,
      error: null,
      isLoading: false,
    },
  };
  const mockPokemonList = pokemonList;
  const mockPokemonDetails = pokemonDetails;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the PokemonList component', () => {
    const {getByText} = render(
      <Provider store={{dispatch, getState: () => mockRootState}}>
        <NavigationContext.Provider value={navigation}>
          <PokemonList />
        </NavigationContext.Provider>
      </Provider>,
    );
    expect(getByText('pokemon1')).toBeDefined();
    expect(getByText('pokemon2')).toBeDefined();
  });

  it('should dispatch fetchPokemonList action when data is fetched', () => {
    const {rerender} = render(
      <Provider store={{dispatch, getState: () => mockRootState}}>
        <NavigationContext.Provider value={navigation}>
          <PokemonList />
        </NavigationContext.Provider>
      </Provider>,
    );
    const pokemonData = {
      results: pokemonList,
    };
    rerender(
      <Provider store={{dispatch, getState: () => mockRootState}}>
        <NavigationContext.Provider value={navigation}>
          <PokemonList />
        </NavigationContext.Provider>
      </Provider>,
    );
    expect(dispatch).toHaveBeenCalledWith(
      fetchPokemonList(pokemonData.results),
    );
  });

  it('should show loading component when isLoading is true', () => {
    const mockRootStateWithLoading: RootState = {
      pokemon: {
        list: [],
        details: {},
        error: null,
        isLoading: true,
      },
    };
    const {getByTestId} = render(
      <Provider store={{dispatch, getState: () => mockRootStateWithLoading}}>
        <NavigationContext.Provider value={navigation}>
          <PokemonList />
        </NavigationContext.Provider>
      </Provider>,
    );
    expect(getByTestId('loading')).toBeDefined();
  });
});
