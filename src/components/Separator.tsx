import React from 'react';
import {View} from 'react-native';

interface Props {
  height: number;
}

function Separator({height}: Props) {
  return (
    <View
      style={{
        height,
        width: '94%',
        backgroundColor: 'gray',
        alignSelf: 'center',
      }}
    />
  );
}

export default Separator;
