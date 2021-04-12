
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
const initialState = {
    todoState: {
        cards: [],
        isOpenModal: false,
        isOpenConfirm: false,
        checkedCards: new Set(),
        deleteCardId: null,
        isCheckedCard: null,
        editSuccess: false,
    },
    singleCard: {},
    loading: false,
    isEditModalOpen: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case 'SET_CARDS': {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    cards: action.data
                }
            }
        }
        case 'ADD_CARD': {
            const cards = [...state.todoState.cards];
            cards.push(action.data)
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    cards,
                    isOpenModal: !state.todoState.isOpenModal
                }
            }
        }
        case 'SET_OR_REMOVE_LOADING': {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    editSuccess: false
                },
                loading: action.isLoading
            }
        }
        case 'TOGGLE_OPEN_MODAL': {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    isOpenModal: !state.todoState.isOpenModal
                }
            }
        }
        case 'TOGGLE_CONFIRM_MODAL': {
            const { checkedCards, cards } = state.todoState;
            let isCheckedCard = null;
            if (checkedCards.size === 1)
                isCheckedCard = cards.find(card => card._id === [...checkedCards][0])
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    isCheckedCard,
                    isOpenConfirm: !state.todoState.isOpenConfirm
                }
            }
        }


        case 'DELETE_ONE_CARD': {
            let cards = [...state.todoState.cards];
            cards = cards.filter(card => card._id !== action._id)
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    cards
                }
            }
        }
        case 'DELETE_CARD_ID': {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    deleteCardId: action._id
                }
            }
        }
        case 'TOGGLE_CHECK_CARD': {
            const { _id } = action;
            let checkedCards = new Set(state.todoState.checkedCards)
            if (!checkedCards.has(_id)) checkedCards.add(_id);
            else checkedCards.delete(_id);
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    checkedCards
                }
            }
        }
        case 'TOGGLE_CHECK_ALL_CARDS': {
            let cards = state.todoState.cards;
            let checkedCards = new Set(state.todoState.checkedCards)
            if (cards.length === checkedCards.size) checkedCards.clear();
            else cards.forEach(card => checkedCards.add(card._id))
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    checkedCards,
                }
            }
        }
        case 'DELETE_CHECKED_CARDS': {
            let { cards } = state.todoState;
            const checkedCards = state.todoState.checkedCards
            cards = cards.filter(card => !checkedCards.has(card._id));
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    cards,
                    checkedCards: new Set(),
                    isOpenConfirm: !state.todoState.isOpenConfirm
                }
            }
        }

        case "EDIT_CARD": {

            const cards = [...state.todoState.cards];
            const index = cards.findIndex(card => card._id === action.card._id)
            cards[index] = action.card;
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    cards,
                    editSuccess: true
                }
            }


        }
        // Single card
        case 'GET_SINGLE_CARD': {
            return {
                ...state,
                singleCard: action.data
            }
        }
        case 'DELETE_SINGLE_CARD': {
            return {
                ...state,
                singleCard: {
                    ...state.singleCard,
                    card: null
                }
            }
        }
        case 'TOGGLE_OPEN_EDIT_MODAL': {
            return {
                ...state,
                isEditModalOpen: !state.isEditModalOpen
            }
        }
        default: return state
    }
}
const store = createStore(reducer, applyMiddleware(thunk));
window.store = store;
export default store
