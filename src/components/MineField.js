import React from 'react'
import { View, StyleSheet } from 'react-native'
import Field from './Field'

export default props => {
    const rows = props.board.map((row, rowIndex) => {
        const colums = row.map((field, columnIndex) => {
            return <Field { ...field } key={columnIndex} 
                        onOpen={() => props.onOpenField(rowIndex, columnIndex) }
                        onLongPress={() => props.onLongPress(rowIndex, columnIndex)} />
        })
        return <View key={rowIndex} style={{flexDirection:'row'}}>{colums}</View>
    })
    return <View style={styles.container}>{rows}</View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEE'
    }
})
