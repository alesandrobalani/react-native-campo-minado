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
                nearMines: 0
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

const createMinedBoard = (rowsAmount, columnsAmount, minesAmount) => {
    const board = createBoard(rowsAmount, columnsAmount)
    spreadMines(board, minesAmount)
    return board
}

export { createMinedBoard }