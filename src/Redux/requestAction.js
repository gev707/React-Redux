import types from './action.Types'
const API_HOST = process.env.REACT_APP_URL;

export const getCardThunk = (data = {}) => (dispatch) => {
    const searchData = { ...data }
    let url = `${API_HOST}/task`;
    let query = '?';
    for (let key in searchData) {
        let value = searchData[key];
        query = `${query}${key}=${value}&`
    }
    dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: true })
    fetch(url + query)
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error
            dispatch({ type: types.SET_CARDS, data })
        })
        .catch(error => {
            dispatch({ type: types.ERROR, error: error.message })
        })
        .finally(() => dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: false }))
};

export const addCardThunk = (formData) => (dispatch) => {
    dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: true })
    fetch(`${API_HOST}/task`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error
            dispatch({ type: types.ADD_CARD, data })
            dispatch({ type: types.SUCCESS, success: 'Add Card SuccessFully' })
        })
        .catch(error => {
            dispatch({ type: types.ERROR, error: error.message })
        })
        .finally(() => dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: false }))
};
export const deleteOneCardThunk = _id => dispatch => {

    dispatch({ type: types.DELETE_CARD_ID, _id })
    fetch(`${API_HOST}/task/${_id}`, {
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({ type: types.DELETE_ONE_CARD, _id })
        })
        .catch(error => {
            dispatch({ type: types.ERROR, error: error.message })
        })
        .finally(() => dispatch({ type: types.DELETE_CARD_ID, _id }))

};
export const deleteAllCheckedCardThunk = (checkedCards) => dispatch => {
    dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: true })
    fetch(`${API_HOST}/task`, {
        method: 'PATCH',
        body: JSON.stringify({ tasks: [...checkedCards] }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({ type: types.DELETE_CHECKED_CARDS })
        })
        .catch(error => {
            dispatch({ type: types.ERROR, error: error.message })
        })
        .finally(() => dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: false }))

}
export const editCardThunk = (editedCard, page = 'todo') => (dispatch) => {
    dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: true })
    fetch(`${API_HOST}/task/${editedCard._id}`, {
        method: 'PUT',
        body: JSON.stringify(editedCard),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;

            if (page === 'todo') {
                dispatch({ type: types.EDIT_CARD, data, page })
                dispatch({ type: types.SUCCESS, success: 'Edit Card SuccessFull' })
            }
            else {
                dispatch({ type: types.EDIT_CARD, data })
                dispatch({ type: types.SUCCESS, success: 'Edit Single Card SuccessFull' })
            }
        })
        .catch(error => {
            dispatch({ type: types.ERROR, error: error.message })
        })
        .finally(() => {
            dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: false })
        })
}
export const getSingleCardThunk = id => dispatch => {
    dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: true })
    fetch(`${API_HOST}/task/${id}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error
            dispatch({ type: types.GET_SINGLE_CARD, data })
        })
        .catch(error => {
            dispatch({ type: types.ERROR, error: error.message })
        })
        .finally(() => dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: false }))
}

export const deleteSingleCardThunk = (_id) => dispatch => {
    dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: true })
    fetch(`${API_HOST}/task/${_id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error
            dispatch({ type: types.DELETE_SINGLE_CARD, _id })
        })
        .catch(error => {
            dispatch({ type: types.ERROR, error: error.message })
        })
        .finally(() => dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: false }))
}

export const getValues = (formData) => (dispatch) => {
    const contactData = { ...formData }
    for (let key in contactData) {
        if (typeof contactData[key] === 'object' && contactData[key].hasOwnProperty('value')) {
            contactData[key] = contactData[key].value;
        }
        else {
            delete contactData[key].value
        }
    }
    dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: true })
    fetch(`${API_HOST}/form`, {
        method: 'POST',
        body: JSON.stringify(contactData),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error
            dispatch({ type: types.TOGGLE_OPEN_CONTACT_MODAL })
            dispatch({ type: types.SUCCESS, success: 'Form Post SuccessFully' })
        })
        .catch(error => {
            dispatch({ type: types.ERROR, error: error.message })
        })
        .finally(() => {
            dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: false })
        })
}
export const cardToggleStatus = (card) => (dispatch) => {
    const status = card.status === 'active' ? 'done' : 'active'
    fetch(`${API_HOST}/task/${card._id}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({ type: types.EDIT_CARD, data })
        })
        .catch(error => {
            dispatch({ type: types.ERROR, error: error.message })
        })
}

