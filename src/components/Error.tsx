import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  retry: () => void;
  error: any;
}

const Error = ({error, retry}: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={retry}>
        <Text>Retry</Text>
      </TouchableOpacity>
      <Text>Error: {error}</Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
