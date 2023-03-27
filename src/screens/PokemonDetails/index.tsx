import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {
  PokemonDetails as PD,
  useLazyGetPokemonDetailsQuery,
} from '../../store/api/pokemonApi';
import {
  fetchPokemonDetails,
  getPokemonsDetails,
} from '../../store/pokemonSlice';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import PokemonRow from '../../components/PokemonRow';

interface Props {
  route: any;
}

function PokemonDetails({route}: Props): JSX.Element {
  const dispatch = useDispatch();
  const {index} = route.params;
  const pokemonId = index + 1;

  const pokemonDetailsData = useSelector((state: RootState) =>
    getPokemonsDetails(state),
  );
  const pokemon = pokemonDetailsData[pokemonId];

  const [
    getPokemonDetails,
    {
      isLoading: pokemonDetailsLoading,
      isError: pokemonDetailsError,
      data: pokemonDetails,
    },
  ] = useLazyGetPokemonDetailsQuery();

  useEffect(() => {
    if (!pokemon) {
      getPokemonDetails(pokemonId);
    }
  }, [pokemon]);

  useEffect(() => {
    if (pokemonDetails && !pokemonDetailsError) {
      dispatch(fetchPokemonDetails(pokemonDetails));
    }
  }, [pokemonDetails, dispatch]);

  if (pokemonDetailsLoading) {
    return <Loading />;
  }

  if (pokemonDetailsError) {
    return (
      <Error
        error={pokemonDetailsError}
        retry={() => getPokemonDetails(pokemonId)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{uri: pokemon?.sprites?.front_default}}
        style={styles.image}
      />
      <PokemonRow title={'Name'} value={pokemon?.name} />
      <PokemonRow title={'Height'} value={pokemon?.height} />
      <PokemonRow title={'Weight'} value={`${pokemon?.weight} kg`} />
      <PokemonRow title={'Types'} value={pokemon?.types} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 300,
    width: 300,
    alignSelf: 'center',
  },
});

export default PokemonDetails;
