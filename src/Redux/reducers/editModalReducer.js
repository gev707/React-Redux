import types from '../action.Types';
const initialState = {
        title:'',
        description:'',
        date:new Date()
}
const editModalReducer= (state=initialState,action)=>{
    switch (action.type) {
        case types.CHANGE_VALUES: {
            const { name, value } = action.target;
            return {
                ...state,
                [name] : value
            }
        }
        case 'GET_EDIT_CARD': {
            const {editCardFromState}= action
            if(editCardFromState){
                editCardFromState.date=new Date(editCardFromState.date);
            }
            return {
                ...editCardFromState,
            }
        }
        case types.SET_DATE: {
            return{
                ...state,
                date:action.date
            }
        }
        default:return state;
    }
}
export default editModalReducer