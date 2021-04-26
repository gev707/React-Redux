import types from '../action.Types'
const initialState = {
   filter: null,
   search:'',
   status:null,
   create_lte:null,
   create_gte:null,
   complete_lte:null,
   complete_gte:null
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_DROPDOWN_FILTER:{
            const {name,value} = action
            return {
                ...state,
                [name]:value
            }
        }
        case types.CHANGE_SEARCH_VALUE : {
            const {target} = action
            return {
                ...state,
                [target.name]:target.value
            }
        }
        case types.SET_SEARCH_DATE : {
            const {name,date} = action;
            return {
                ...state,
                [name]:date
            }
        }

        default: return state
    }
}
export default searchReducer