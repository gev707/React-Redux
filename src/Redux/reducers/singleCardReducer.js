import types from '../action.Types'
const initialState = {
    singleCard:null,
    isEditModalOpen: false,
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
        case types.TOGGLE_OPEN_SINGLE_CARD_MODAL: {
            return {
                ...state,
                isEditModalOpen: !state.isEditModalOpen
            }
        }
        // case types.CLOSE_SINGLE_CARD_MODAL: {
        //     return {
        //         ...state,
        //         isEditModalOpen:false
        //     }
        // }
        
        case types.RESET: {
            return {
                ...initialState
            }
        }
        default: return state;
    }
}
export default singleCardReducer