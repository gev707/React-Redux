const types = Object.freeze({
    //global actions
    SET_OR_REMOVE_LOADING: 'SET_OR_REMOVE_LOADING',
    ERROR: 'ERROR',
    SUCCESS:'SUCCESS',
    OPEN_NAVBAR:"OPEN_NAVBAR",
    //reset-action
    RESET:'RESET',
    //todo actions
    SET_CARDS: 'SET_CARDS',
    ADD_CARD: 'ADD_CARD',
    EDIT_CARD: 'EDIT_CARD',
    DELETE_ONE_CARD: 'DELETE_ONE_CARD',
    DELETE_CARD_ID: 'DELETE_CARD_ID',
    DELETE_CHECKED_CARDS: 'DELETE_CHECKED_CARDS',
    TOGGLE_OPEN_MODAL: 'TOGGLE_OPEN_MODAL',
    TOGGLE_CONFIRM_MODAL: 'TOGGLE_CONFIRM_MODAL',
    CLOSE_CONFIRM_MODAL:'CLOSE_CONFIRM_MODAL',
    TOGGLE_CHECK_CARD: 'TOGGLE_CHECK_CARD',
    TOGGLE_CHECK_ALL_CARDS: 'TOGGLE_CHECK_ALL_CARDS',
    TOGGLE_OPEN_EDIT_MODAL: 'TOGGLE_OPEN_EDIT_MODAL',
    //singleCard actions
    GET_SINGLE_CARD: 'GET_SINGLE_CARD',
    DELETE_SINGLE_CARD: 'DELETE_SINGLE_CARD',
    TOGGLE_OPEN_SINGLE_CARD_MODAL:'TOGGLE_OPEN_SINGLE_CARD_MODAL',
    //contact actions
    CHANGE_VALUES:'CHANGE_VALUES',
    CLOSE_AND_RESET:'CLOSE_AND_RESET',
    TOGGLE_OPEN_CONTACT_MODAL:'TOGGLE_OPEN_CONTACT_MODAL',
    //addModal
    SET_DATE:'SET_DATE',
    //editmodal actions
    GET_EDIT_CARD:'GET_EDIT_CARD',
    CHANGE_EDIT_CARD_VALUES:'CHANGE_EDIT_CARD_VALUES',
    SET_EDIT_CARD_DATE:'SET_EDIT_CARD_DATE',
    CLOSE_EDIT_MODAL:'CLOSE_EDIT_MODAL',
    //search actions
    SET_DROPDOWN_FILTER:'SET_DROPDOWN_FILTER',
    CHANGE_SEARCH_VALUE:'CHANGE_SEARCH_VALUE',
    SET_SEARCH_DATE:'SET_SEARCH_DATE'
})
export default types