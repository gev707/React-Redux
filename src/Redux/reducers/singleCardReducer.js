import types from '../action.Types'
const initialState = {
    singleCard:null,
    isOpenModal:false
}
const singleCardReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_SINGLE_CARD: {
            return {
                ...state,
                singleCard: action.data,
            }
        }
        case types.DELETE_SINGLE_CARD: {
            return {
                ...state,
                card: null
            }
        }
        case types.TOGGLE_MODAL: {
            return {
                ...state,
                isOpenModal: !state.isOpenModal
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