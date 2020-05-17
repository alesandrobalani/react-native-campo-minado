const createBoard = (rowsAmount, columnsAmount) => {
    return Array(rowsAmount).fill(0).map((_, indexRow) => {
        return Array(columnsAmount).fill(0).map((_, indexColumn) => {
            return {
                indexRow,
                indexColumn,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0,
                neighborhoods: [],
                safeNeighborhood: () => {
                    return neighborhoods.filter(n => n.mined).length === 0
                },
                openField: () => {
                    if (opened)
                        return
                    opened = true
                    if (mined) {
                        exploded = true
                        return
                    }
                    if (safeNeighborhood()) {
                       neighborhoods.forEach(n => n.openField())
                        return
                    }
                    nearMines = neighborhoods.filter(n => n.mined).length
                }
            }
        })
    })
}

const spreadMines = (board, minesAmount) => {
    Array(minesAmount).fill(0).map((_, index) => {
        let selected = false
        while (!selected) {
            const rowIndex = parseInt(Math.random() * board.length, 10)
            const columnIndex = parseInt(Math.random() * board[0].length, 10)
            if (!board[rowIndex][columnIndex].mined) {
                board[rowIndex][columnIndex].mined = true
                selected = true
            }
        }
    })
}

const calculateNeighborhoods = (board) => {
    board.map((field, _) => {
        field.neighborhoods = board.filter(indexRow >= field.rowIndex - 1 
            && indexRow <= field.rowIndex + 1
            && indexColumn >= field.columnIndex - 1
            && indexColumn <= field.columnIndex + 1)
    })
}

const createMinedBoard = (rowsAmount, columnsAmount, minesAmount) => {
    const board = createBoard(rowsAmount, columnsAmount)
    spreadMines(board, minesAmount)
    calculateNeighborhoods(board)
    return board
}

export { createMinedBoard }