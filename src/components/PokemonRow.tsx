import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Separator from './Separator';

interface Props {
  title: string;
  value: string | {type: {name: string}}[];
}

const PokemonRow = ({title, value}: Props) => {
  const renderValue = () => {
    if (Array.isArray(value)) {
      return (
        <View style={styles.arrayContainer}>
          {value.map((item, index) => (
            <Text key={index} style={styles.arrayValue}>
              {item.type.name}
            </Text>
          ))}
        </View>
      );
    }
    return <Text style={styles.value}>{value}</Text>;
  };

  return (
    <>
      <Separator height={1} />
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {renderValue()}
      </View>
    </>
  );
};

export default PokemonRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
  arrayContainer: {
    flex: 1,
  },
  arrayValue: {
    textAlign: 'center',
    fontSize: 16,
  },
});
