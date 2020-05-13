/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import params from './params'
import Field from './components/Field'

const App: () => React$Node = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Iniciando Mines...</Text>
      <Text style={styles.instructions}>Tamanho da grade:
        {params.getColumnsAmount()}x{params.getRowsAmount()}
      </Text>
      <Field />
      <Field opened />
      <Field opened nearMines={1} />
      <Field opened nearMines={2} />
      <Field opened nearMines={3} />
      <Field opened nearMines={4} />
      <Field opened nearMines={5} />
      <Field opened nearMines={6} />
      <Field opened nearMines={7} />
      <Field opened nearMines={8} />
      <Field mined />
      <Field opened mined />
      <Field opened mined exploded />
      <Field flagged />
      <Field flagged opened/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default App;
