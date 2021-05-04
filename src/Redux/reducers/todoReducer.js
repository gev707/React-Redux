import types from '../action.Types';

const initialState = {
    cards: [],
    editableCard: null,
    isOpenModal: false,
    isOpenConfirm: false,
    checkedCards: new Set(),
    deleteCardId: null,
    isCheckedCard: null,

}

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_CARDS: {
            return {
                ...state,
                cards: action.data,
            }
        }
        case types.ADD_CARD: {
            const cards = [...state.cards];
            cards.push(action.data)
            return {
                ...state,
                cards,
                isOpenModal: !state.isOpenModal

            }
        }
        case types.TOGGLE_OPEN_MODAL: {
            return {
                ...state,
                isOpenModal: !state.isOpenModal
            }
        }
        case types.TOGGLE_CONFIRM_MODAL: {
            const { checkedCards, cards } = state;
            let isCheckedCard = null;
            if (checkedCards.size === 1)
                isCheckedCard = cards.find(card => card._id === [...checkedCards][0]);
            return {
                ...state,
                isCheckedCard,
                isOpenConfirm: !state.isOpenConfirm
            }
        }
        case types.DELETE_ONE_CARD: {
            let cards = [...state.cards];
            cards = cards.filter(card => card._id !== action._id)
            return {
                ...state,
                cards
            }
        }
        case types.DELETE_CARD_ID: {
            return {
                ...state,
                deleteCardId: action._id
            }
        }
        case types.TOGGLE_CHECK_CARD: {
            const { _id } = action;
            let checkedCards = new Set(state.checkedCards)
            if (!checkedCards.has(_id)) checkedCards.add(_id);
            else checkedCards.delete(_id);
            return {
                ...state,
                checkedCards
            }
        }
        case types.TOGGLE_CHECK_ALL_CARDS: {
            let cards = state.cards;
            let checkedCards = new Set(state.checkedCards)
            if (cards.length === checkedCards.size) checkedCards.clear();
            else cards.forEach(card => checkedCards.add(card._id))
            return {
                ...state,
                checkedCards,
            }
        }
        case types.DELETE_CHECKED_CARDS: {
            let { cards } = state;
            const checkedCards = state.checkedCards
            cards = cards.filter(card => !checkedCards.has(card._id));
            return {
                ...state,
                cards,
                checkedCards: new Set(),
                isOpenConfirm: !state.isOpenConfirm
            }
        }
        case types.EDIT_CARD: {
            const cards = [...state.cards];
            const index = cards.findIndex(card => card._id === action.data._id)
            cards[index] = action.data;
            return {
                ...state,
                cards,
                editableCard: null,
            }
        }
        case types.TOGGLE_OPEN_EDIT_MODAL: {
            return {
                ...state,
                editableCard: action.editableCard,
            }
        }
        case types.CLOSE_EDIT_MODAL: {
            return {
                ...state,
                editableCard: null,
            }
        }
        case types.CLOSE_CONFIRM_MODAL: {
            return {
                ...state,
                checkedCards: new Set(),
                isOpenConfirm: !state.isOpenConfirm
            }
        }
        default: return state
    }
};

export default todoReducer