import types from '../action.Types'
import { isRequired, maxLength, minLength, validateEmail } from '../../helpers/validators'
const maxLength30 = maxLength(30)
const minLength3 = minLength(3)
const initialState = {
    name: {
        valid: false,
        error: false,
        value: ''
    },
    email: {
        valid: false,
        error: false,
        value: ''
    },
    message: {
        valid: false,
        error: false,
        value: ''
    },
    isOpen: false,
}
const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_VALUES: {
            const { name, value } = action.target
            let valid = true;
            let error = null;
            error = isRequired(value) ||
                (name === 'name' ? maxLength30(value) : null) ||
                (name === 'name' || name === 'message' ? minLength3(value) : null) ||
                (name === 'email' && validateEmail(value))

            if (error) valid = false
            return {
                ...state,
                [name]: {
                    valid: valid,
                    error: error,
                    value: value
                }
            }
        }
        case types.TOGGLE_OPEN_CONTACT_MODAL: {
            return {
                ...state,
                isOpen: !state.isOpen
            }
        }
        case types.CLOSE_AND_RESET: {
            return {
                ...initialState,
            }
        }
        default: return state;
    }
}
export default contactReducer