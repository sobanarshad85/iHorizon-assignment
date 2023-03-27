import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {POKEMON_DETAILS} from '../constants';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import Separator from './Separator';

interface Props {
  name: string;
  navigation: NavigationProp<ParamListBase>;
}

function PokemonListItem({name, navigation}: Props) {
  const imageUrl =
    'https://images.unsplash.com/photo-1526045612212-70caf35c14df';
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(POKEMON_DETAILS)}
      style={{flex: 1}}
      key={name}>
      <Separator height={1} />
      <View style={{flexDirection: 'row', paddingVertical: 10, flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={{uri: imageUrl}} style={{height: 30, width: 30}} />
        </View>
        <Text style={{flex: 2, textAlign: 'center'}}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default PokemonListItem;
