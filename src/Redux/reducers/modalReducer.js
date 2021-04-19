
import types from '../action.Types'
const initialState = {
    title: '',
    description: '',
    date:new Date()
}
const modalReducer = (state=initialState,action)=> {
    switch (action.type) {
       
        case types.CHANGE_VALUES: {
            const { name, value } = action.target;
            return {
                ...state,
                [name] : value
            }
        }
        case types.SET_DATE: {
            return{
                ...state,
                date:action.date
            }
        }
        case types.RESET : {
            return{
                ...initialState
            }
        }
        default:return state;
           
    }
}
export default modalReducer