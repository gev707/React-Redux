import types from '../action.Types'
const initialState = {
    singleCard: {},
    isEditModalOpen:false,
}
const singleCardReducer = (state=initialState,action) => {
    switch (action.type) {
        case types.GET_SINGLE_CARD: {
            return {
                ...state,
                singleCard: action.data,
                isEditModalOpen:false
            }
        }
        case types.DELETE_SINGLE_CARD: {
            return {
                ...state,  
                card: null
            }
        }
        case types.TOGGLE_OPEN_EDIT_MODAL: {
            return {
                ...state,
                isEditModalOpen: !state.isEditModalOpen
            }
        }
        case types.RESET: {
            return {
                ...initialState
            }
        }
        default: return state;
    }
}
export default singleCardReducer