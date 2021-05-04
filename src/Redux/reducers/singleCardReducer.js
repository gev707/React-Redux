import types from '../action.Types'
const initialState = {
    singleCard:null,
    isOpenEditModal:false
}
const singleCardReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_SINGLE_CARD: {
            return {
                ...state,
                singleCard: action.data,
            }
        }
        case types.TOGGLE_MODAL: {
            return {
                ...state,
                isOpenEditModal: !state.isOpenEditModal
            }
        }
        case types.RESET : {
            return {
                ...initialState
            }
        }
        default: return state;
    }
}
export default singleCardReducer