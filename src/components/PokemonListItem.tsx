import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {POKEMON_DETAILS} from '../constants';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import Separator from './Separator';

interface Props {
  name: string;
  navigation: NavigationProp<ParamListBase>;
  index: number;
}

function PokemonListItem({name, index, navigation}: Props) {
  const imageUrl =
    'https://images.unsplash.com/photo-1526045612212-70caf35c14df';
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(POKEMON_DETAILS, {index})}
      style={styles.container}
      key={name}>
      <Separator height={1} />
      <View style={styles.subContainer}>
        <View style={styles.imageContainer}>
          <Image source={{uri: imageUrl}} style={{height: 30, width: 30}} />
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
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    flex: 2,
    textAlign: 'center',
  },
});
