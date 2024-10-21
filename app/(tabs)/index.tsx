import { Image, StyleSheet, Platform, View } from 'react-native';



import * as React from 'react';
import { Button } from 'react-native-paper';

export default function HomeScreen() {
  return (

    <View>
      <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
          Press me
      </Button>
    </View>

  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
