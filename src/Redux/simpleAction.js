import types from './action.Types'

export const toggleOpenModal = ()=> (dispatch)=>{
    dispatch({ type: types.TOGGLE_OPEN_MODAL })
}
export const toggleOpenConfirm = ()=> (dispatch)=>{
    dispatch({ type:types.TOGGLE_CONFIRM_MODAL })
}
export const toggleSetCardModal = (editCard)=> (dispatch)=>{
    dispatch({ type: types.TOGGLE_OPEN_EDIT_MODAL, editCard})
}
export const toggleCheckedAll = ()=> (dispatch)=>{
    dispatch({ type: types.TOGGLE_CHECK_ALL_CARDS })
}
export const toggleCheckCard = (_id)=> (dispatch)=>{
    dispatch({ type: types.TOGGLE_CHECK_CARD, _id })
}
export const toggleOpenEditModal = ()=> (dispatch)=>{
    dispatch({ type:types.TOGGLE_OPEN_EDIT_MODAL})
}
export const reset =()=>(dispatch)=> {
    dispatch({type:types.RESET})
}
export const changeValues =(target)=>(dispatch)=> {
    dispatch({type:types.CHANGE_VALUES,target})
}
export const toggleOpenNavbar = ()=> (dispatch)=>{
    dispatch({ type: types.OPEN_NAVBAR })
}
export const closeAndReset =()=>(dispatch)=> {
    dispatch({type:types.CLOSE_AND_RESET})
}
export const setDate =(date)=>(dispatch)=> {
    dispatch({type:types.SET_DATE,date})
}
export const getEditValue = (editCardFromState)=>(dispatch)=>{
    dispatch({type:'GET_EDIT_CARD',editCardFromState})
}
