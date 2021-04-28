import types from './action.Types'
//todo state actions
export const toggleOpenModal = ()=> (dispatch)=>{
    dispatch({ type: types.TOGGLE_OPEN_MODAL })
}
export const toggleOpenConfirm = ()=> (dispatch)=>{
    dispatch({ type:types.TOGGLE_CONFIRM_MODAL })
}
export const closeConfirmModal=()=>(dispatch)=>{
    dispatch({ type:types.CLOSE_CONFIRM_MODAL })
}
export const toggleCheckedAll = ()=> (dispatch)=>{
    dispatch({ type: types.TOGGLE_CHECK_ALL_CARDS })
}
export const toggleCheckCard = (_id)=> (dispatch)=>{
    dispatch({ type: types.TOGGLE_CHECK_CARD, _id })
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
//edit card actions
export const getEditCard = (editableCard)=>(dispatch)=>{
    dispatch({type:types.GET_EDIT_CARD,editableCard})
}
export const toggleSetCard = (editableCard)=> (dispatch)=>{
    dispatch({ type: types.TOGGLE_OPEN_EDIT_MODAL, editableCard})
}
export const changeEditCardValue =(target)=>(dispatch)=> {
    dispatch({type:types.CHANGE_EDIT_CARD_VALUES,target})
}
export const setEditDate =(date)=>(dispatch)=> {
    dispatch({type:types.SET_EDIT_CARD_DATE,date})
}
export const closeEditModal = ()=>(dispatch)=> {
 dispatch({type:types.CLOSE_EDIT_MODAL})
}
export const toggleOpenEditModal = ()=> (dispatch)=>{
    dispatch({ type:types.TOGGLE_OPEN_SINGLE_CARD_MODAL})
}
export const closeSingleCardModal = ()=> (dispatch)=>{
    dispatch({ type:types.CLOSE_SINGLE_CARD_MODAL})
}
//searching actions
export const setFilterValue = (name,value) => dispatch=> {
    dispatch({type:types.SET_DROPDOWN_FILTER,name,value})
}
export const changeSearchValue = target => dispatch => {
    dispatch({type:types.CHANGE_SEARCH_VALUE,target})
}
export const setSearchDate =(name,date) => dispatch=> {
    dispatch({type:types.SET_SEARCH_DATE,name,date})
}
//contact form actions
export const toggleOpenContactModal = ()=> (dispatch)=> {
    dispatch({type:types.TOGGLE_OPEN_CONTACT_MODAL})
}
