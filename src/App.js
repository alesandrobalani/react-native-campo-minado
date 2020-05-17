import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import params from './params'
import MineField from './components/MineField'
import { createMinedBoard } from './functions'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = this.createState()
  }

  minesAmount = () => {
    const columnsAmount = params.getColumnsAmount()
    const rowsAmount = params.getRowsAmount()
    return Math.ceil(columnsAmount * rowsAmount * params.dificultLevel)
  }

  createState = () => {
    const columnsAmount = params.getColumnsAmount()
    const rowsAmount = params.getRowsAmount()
    return {
      board: createMinedBoard(rowsAmount, columnsAmount, this.minesAmount())
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Iniciando Mines...</Text>
        <Text>Tamanho da grade:
        {params.getColumnsAmount()}x{params.getRowsAmount()}
        </Text>
        <MineField style={styles.board} board={this.state.board} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  board: {
    backgroundColor: '#AAA'
  },
});