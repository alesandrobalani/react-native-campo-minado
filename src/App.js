import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
} from 'react-native';
import params from './params'
import MineField from './components/MineField'
import { 
  createMinedBoard
  , openField  
  , cloneBoard 
  , wonGame
  , lostGame
  , showMines
  , invertFlag
  , flagUsed
} from './functions'
import Header from './components/Header'
import LevelSelect from './Screens/LevelSelect'

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
      board: createMinedBoard(rowsAmount, columnsAmount, this.minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false
    }
  }

  onOpenField = (rowIndex, columnIndex) => {
    if (this.state.won 
      || this.state.lost
      || this.state.board[rowIndex][columnIndex].flagged)
      return

    const board = cloneBoard(this.state.board)
    openField(board, rowIndex, columnIndex)
    
    const won = wonGame(board)
    if (won) {
      Alert.alert('Parabéns', 'Você venceu!!!')
    }

    const lost = lostGame(board)
    if (lost) {
      Alert.alert('Perdeu', 'Tente novamente')
    }
    
    if (won || lost) {
      showMines(board)
    }

    this.setState({ board, won, lost })
  }

  onLongPress = (rowIndex, columnIndex) => {
    const board = cloneBoard(this.state.board)
    invertFlag(board, rowIndex, columnIndex)
    this.setState({ board })
  }

  flagUsed = () => {
    return flagUsed(this.state.board)
  }

  onLevelSelected = level => {
    params.dificultLevel = level
    this.setState(this.createState())
  }

  render() {
    return (
      <View style={styles.container}>
        <LevelSelect 
          onLevelSelected={this.onLevelSelected}
          onClose={() => this.setState({ showLevelSelection: false })}
          isVisible={this.state.showLevelSelection}
        />
        <Header 
          flagsLeft={ this.minesAmount() - this.flagUsed() }
          onNewGame={() => this.setState({ showLevelSelection: true })} />
        <View style={styles.board}>
          <MineField style={ styles.board } board={ this.state.board } 
            onOpenField={ this.onOpenField } 
            onLongPress={ this.onLongPress } />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  board: {
    backgroundColor: '#AAA',
    alignItems: 'center'
  },
});