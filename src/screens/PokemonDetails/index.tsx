import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useGetPokemonDetailsQuery} from '../../store/api/pokemonApi';
import {
  fetchPokemonDetails,
  selectPokemonDetails,
} from '../../store/pokemonSlice';
import {RootState} from '../../store';
import Error from '../../components/Error';
import Loading from '../../components/Loading';

function PokemonDetails({route}: {route: any}): JSX.Element {
  const {index} = route.params;
  const dispatch = useDispatch();
  const pokemonDetailsData = useSelector((state: RootState) =>
    selectPokemonDetails(state),
  );
  const {
    data: pokemonDetails,
    error: pokemonDetailsError,
    isLoading: pokemonDetailsLoading,
    refetch: pokemonDetailsRefetch,
  }: any = useGetPokemonDetailsQuery(index + 1);
  useEffect(() => {
    dispatch(fetchPokemonDetails(pokemonDetails));
  }, [pokemonDetails, dispatch]);

  useEffect(() => {
    console.warn('here it is: ', pokemonDetailsData);
  }, [pokemonDetailsData]);

  if (pokemonDetailsLoading) return <Loading />;
  if (pokemonDetailsError)
    return <Error error={pokemonDetailsError} retry={pokemonDetailsRefetch} />;
  return (
    <View style={styles.container}>
      <Text style={{flex: 2, textAlign: 'center'}}>{pokemonDetails?.name}</Text>
    </View>
  );
}

export default PokemonDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
