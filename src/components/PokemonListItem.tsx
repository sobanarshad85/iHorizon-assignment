import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {POKEMON_DETAILS} from '../constants';
import Separator from './Separator';

interface PokemonListItemProps {
  name: string;
  index: number;
  url?: string;
  navigation: NavigationProp<ParamListBase>;
}

function PokemonListItem({name, index, url, navigation}: PokemonListItemProps) {
  const imageUrl =
    url ??
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png';

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(POKEMON_DETAILS, {index, name})}
      style={styles.container}>
      <Separator height={1} />
      <View style={styles.subContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: imageUrl}}
            style={url ? styles.image : styles.image1}
          />
        </View>
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default PokemonListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 50,
    width: 50,
  },
  image1: {
    height: 40,
    width: 40,
  },
  name: {
    flex: 2,
    textAlign: 'center',
  },
});
