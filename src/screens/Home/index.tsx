import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  NavigationProp,
  useNavigation,
  ParamListBase,
} from '@react-navigation/native';
import {RootState} from '../../store';
import {Pokemon, useLazyGetPokemonListQuery} from '../../store/api/pokemonApi';
import {
  fetchPokemonList,
  getPokemonsDetails,
  getPokemonList,
  getOffset,
  getNext,
} from '../../store/pokemonSlice';
import {View, StyleSheet, VirtualizedList} from 'react-native';
import PokemonListItem from '../../components/PokemonListItem';
import Error from '../../components/Error';
import Loading from '../../components/Loading';

type Item = {
  item: Pokemon;
  index: number;
};

function PokemonList() {
  // Hooks
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  // Selectors
  const pokemonList = useSelector(getPokemonList);
  const pokemonDetails = useSelector(getPokemonsDetails);
  const offset = useSelector(getOffset);
  const next = useSelector(getNext);

  // Queries
  const [
    getPokemonsList,
    {isLoading: isPokemonDataLoading, isError: pokemonError, data: pokemonData},
  ] = useLazyGetPokemonListQuery();

  // Effects
  useEffect(() => {
    if (offset === 0) {
      getPokemonsList(offset);
    }
  }, [offset]);

  useEffect(() => {
    pokemonData &&
      !pokemonError &&
      dispatch(
        fetchPokemonList({result: pokemonData.results, next: pokemonData.next}),
      );
  }, [pokemonData, dispatch]);

  // Functions
  const renderItem = ({item, index}: Item) => {
    const image = pokemonDetails[index + 1]?.sprites?.front_default;

    return (
      <PokemonListItem
        url={image}
        name={item.name}
        index={index}
        navigation={navigation}
      />
    );
  };

  const renderFooter = () => {
    if (isPokemonDataLoading) {
      return <Loading />;
    }
    return null;
  };

  const getItem = (data: Pokemon[], index: number) => data[index];
  const getItemCount = (data: Pokemon[]) => data.length;
  const onEndReached = () => {
    if (!isPokemonDataLoading && next) {
      getPokemonsList(offset);
    }
  };

  // Render
  if (pokemonError) {
    return (
      <Error retry={() => getPokemonsList(offset - 1)} error={pokemonError} />
    );
  }

  return (
    <View style={styles.container}>
      <VirtualizedList
        data={pokemonList}
        getItem={getItem}
        getItemCount={getItemCount}
        keyExtractor={item => item.name.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.0001}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PokemonList;
