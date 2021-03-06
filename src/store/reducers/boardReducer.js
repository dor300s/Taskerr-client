const initialState = {
    boards: [],
    currBoard: null
}

export function boardReducer(state = initialState, action) {

    switch (action.type) {
        case 'SET_BOARDS':
            return {
                ...state,
                boards: action.boards
            }
        case 'SET_BOARD':

            return {
                ...state,
                currBoard: action.board
            }

        case 'RESET_BOARD':
            return {
                ...state,
                currBoard: null
            }

        case 'ADD_BOARD':
            return {
                ...state,
                boards: [...state.boards, action.board]
            }
        case 'UPDATE_BOARD':

            return {
                ...state,
                currBoard: action.board,
                boards: state.boards.map(board => {
                    if (board._id === action.board._id) return action.board;
                    return board;
                })
            }
        case 'REMOVE_BOARD':
            return {
                ...state,
                boards: state.boards.filter(board => board._id !== action.boardId)
            }
        default:
            return state;
    }
}



