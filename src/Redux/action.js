import types from './action.Types'

const API_HOST = 'http://localhost:3001';

export const setCardsThunk = dispatch => {
    
    dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: true })
    fetch(`${API_HOST}/task`)
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error
            dispatch({ type: types.SET_CARDS, data })
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: false }))
};

export const addCardThunk = (dispatch, formData) => {

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
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: false }))

};

export const deleteOneCardThunk = (dispatch, _id) => {

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
            console.log('Catch Error', error)
        })
        .finally(() => dispatch({ type: types.DELETE_CARD_ID, _id }))

};

export const deleteAllCheckedCardThunk = (dispatch, checkedCards) => {

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
            console.log('Catch Error', error)
        })
        .finally(() => dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: false }))

}



export const editCardThunk = (dispatch, editCard) => {
    dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: true })
    fetch(`${API_HOST}/task/${editCard._id}`, {
        method: 'PUT',
        body: JSON.stringify(editCard),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({ type: 'EDIT_CARD', data: data })
        })
        .catch(error => {
            console.log('Catch Error', error)
        })
        .finally(() => {
            dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: false })
        })
}


export const getSingleCardThunk = (dispatch, id) => {

    dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: true })
    fetch(`${API_HOST}/task/${id}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error
            dispatch({ type: types.GET_SINGLE_CARD, data })
        })
        .catch(error => {
            console.log('Catch Error', error)
        })
        .finally(() => dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: false }))

}
export const deleteSingleCardThunk = (dispatch, _id) => {
    dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: true })
    fetch(`${API_HOST}/task/${_id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error
        })
        .catch(error => {
            console.log('singleCardError', error);

        })
        .finally(() => dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: true }))
}
