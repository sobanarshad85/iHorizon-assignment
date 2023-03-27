import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useGetPokemonListQuery} from '../../store/api/pokemonApi';
import {
  selectPokemonList,
  fetchPokemonList,
  selectPokemonListError,
  selectPokemonListStatus,
  setPokemonListStatus,
} from '../../store/pokemonSlice';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PokemonListItem from '../../components/PokemonListItem';
import {
  NavigationProp,
  useNavigation,
  ParamListBase,
} from '@react-navigation/native';
import {RootState} from '../../store';
import Error from '../../components/Error';

function PokemonList() {
  const dispatch = useDispatch();
  const pokemonList = useSelector((state: RootState) =>
    selectPokemonList(state),
  );
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const {
    data: pokemonData,
    error: pokemonError,
    isLoading: isPokemonDataLoading,
    refetch: refetchPokemonData,
  } = useGetPokemonListQuery();

  useEffect(() => {
    if (pokemonData) {
      dispatch(fetchPokemonList(pokemonData.results));
    }
  }, [pokemonData, dispatch]);

  if (isPokemonDataLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (pokemonError) {
    return <Error retry={refetchPokemonData} error={pokemonError} />;
  }
  return (
    <View style={styles.container}>
      {pokemonList.map(pokemon => (
        <PokemonListItem name={pokemon.name} navigation={navigation} />
      ))}
    </View>
  );
}

export default PokemonList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
