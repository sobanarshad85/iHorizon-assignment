import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Separator from '../../components/Separator';
import {useDispatch, useSelector} from 'react-redux';
import {useGetPokemonDetailsQuery} from '../../store/api/pokemonApi';
import {
  fetchPokemonDetails,
  selectPokemonDetails,
} from '../../store/pokemonSlice';
import {RootState} from '../../store';

function PokemonDetails(): JSX.Element {
  const dispatch = useDispatch();
  const pokemonDetailsData = useSelector((state: RootState) =>
    selectPokemonDetails(state),
  );
  const {data: pokemonDetails, error: pokemonDetailsError} =
    useGetPokemonDetailsQuery(1);
  useEffect(() => {
    console.warn(pokemonDetails);
    dispatch(fetchPokemonDetails(pokemonDetails));
  }, [pokemonDetails, dispatch]);

  useEffect(() => {
    console.warn('here it is: ', pokemonDetailsData);
  }, [pokemonDetailsData]);
  return (
    <View style={styles.container}>
      <Text style={{flex: 2, textAlign: 'center'}}>Pokemon Details</Text>
    </View>
  );
}

export default PokemonDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
