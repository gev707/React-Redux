import types from '../action.Types'
const initialState = {
    loading: false,
    isOpen:false,
    error: '',
    success:''
}
const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_OR_REMOVE_LOADING:
            return {
                ...state,
                loading: action.isLoading,
                error: action.isLoading ? '' : state.error,
                success: action.isLoading? '' : state.success
            }
        case types.ERROR: {
            return {
                ...state,
                error: action.error
            }
        }
        case types.SUCCESS: {
            return {
                ...state,
                success: action.success
            }
        }
        case types.OPEN_NAVBAR: {
            return {
                ...state,
                isOpen:!state.isOpen
            }
        }
        default: return state

    }
}
export default globalReducer