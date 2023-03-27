import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  NavigationProp,
  useNavigation,
  ParamListBase,
} from '@react-navigation/native';
import {RootState} from '../../store';
import {Pokemon, useGetPokemonListQuery} from '../../store/api/pokemonApi';
import {
  fetchPokemonList,
  selectPokemonDetails,
  selectPokemonList,
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
  const dispatch = useDispatch();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  // Selectors
  const pokemonList = useSelector((state: RootState) =>
    selectPokemonList(state),
  );
  const pokemonDetails = useSelector((state: RootState) =>
    selectPokemonDetails(state),
  );

  // API Query
  const {
    data: pokemonData,
    error: pokemonError,
    isLoading: isPokemonDataLoading,
    refetch: refetchPokemonData,
  }: any = useGetPokemonListQuery();

  // Fetch data on component mount
  useEffect(() => {
    if (pokemonData) {
      dispatch(fetchPokemonList(pokemonData.results));
    }
  }, [pokemonData, dispatch]);

  // Error handling
  if (pokemonError) {
    return <Error retry={refetchPokemonData} error={pokemonError} />;
  }

  // Render functions
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

  // VirtualizedList
  const getItem = (data: Pokemon[], index: number) => data[index];
  const getItemCount = (data: Pokemon[]) => data.length;
  const onEndReached = () => {
    // TODO: Perform action on end reached
  };

  return (
    <View style={styles.container}>
      <VirtualizedList
        data={pokemonList}
        getItemCount={getItemCount}
        getItem={getItem}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.01}
        keyExtractor={item => item.name.toString()}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

export default PokemonList;

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
