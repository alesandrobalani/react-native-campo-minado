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

const getNeighborhood = (board, rowIndex, columnIndex) => {
    return board.flatMap(row => row.filter(field => field.indexRow >= rowIndex - 1 
            && field.indexRow <= rowIndex + 1 
            && field.indexColumn >= columnIndex - 1
            && field.indexColumn <= columnIndex + 1))
}

const safeNeighborhood = (board, rowIndex, columnIndex) => {
    return getNeighborhood(board, rowIndex, columnIndex).filter(n => n.mined).length === 0
}

const openField = (board, rowIndex, columnIndex) => {
    let field = board[rowIndex][columnIndex]
    if (!field.opened) {
        field.opened = true

        if (field.mined) {
            field.exploded = true
        } else if(safeNeighborhood(board, rowIndex, columnIndex)) {
            getNeighborhood(board, rowIndex, columnIndex).forEach(field => openField(board, field.indexRow, field.indexColumn))
        } else {
            field.nearMines = getNeighborhood(board, rowIndex, columnIndex).filter(f => f.mined).length
        }      
    }
}

const cloneBoard = board => {
    return board.map(rows => {
        return rows.map(field => {
            return { ...field }
        })
    })
}

const wonGame = board => {
    return board.filter(row => row.filter(field => (field.exploded || (!field.opened && !field.mined))).length > 0).length === 0
}

const lostGame = board => {
    return board.filter(row => row.filter(field => field.exploded).length > 0).length > 0
}

const showMines = board => {
    board.map(row => {
        row
        .filter(field => field.mined && !field.exploded)
        .map(field => {
            field.opened = true
        })
    })
}

const invertFlag = (board, rowindex, columnIndex) => {
    const field = board[rowindex][columnIndex]
    field.flagged = !field.flagged
}

const flagUsed = board => {
    return board.flatMap(row => row.filter(field => field.flagged)).length
}

export { createMinedBoard, openField, cloneBoard, wonGame, lostGame, showMines, invertFlag, flagUsed }