import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Pokemon, useGetPokemonListQuery} from '../../store/api/pokemonApi';
import {selectPokemonList, fetchPokemonList} from '../../store/pokemonSlice';
import {View, StyleSheet, VirtualizedList} from 'react-native';
import PokemonListItem from '../../components/PokemonListItem';
import {
  NavigationProp,
  useNavigation,
  ParamListBase,
} from '@react-navigation/native';
import {RootState} from '../../store';
import Error from '../../components/Error';
import Loading from '../../components/Loading';

type Item = {
  item: Pokemon;
  index: number;
};

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
  }: any = useGetPokemonListQuery();

  useEffect(() => {
    if (pokemonData) {
      dispatch(fetchPokemonList(pokemonData.results));
    }
  }, [pokemonData, dispatch]);

  if (pokemonError)
    return <Error retry={refetchPokemonData} error={pokemonError} />;

  const renderItem = ({item, index}: Item) => (
    <PokemonListItem name={item.name} index={index} navigation={navigation} />
  );
  const getItem = (data: Pokemon[], index: number) => data[index];
  const getItemCount = (data: Pokemon[]) => data.length;
  const onEndReached = () => {
    if (!isPokemonDataLoading) {
    }
  };
  const renderFooter = () => {
    if (isPokemonDataLoading) return <Loading />;
    return null;
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
