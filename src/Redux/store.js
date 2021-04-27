import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import todoReducer from './reducers/todoReducer'
import globalReducer from './reducers/globalReducer'
import singleCardReducer from './reducers/singleCardReducer'
import contactReducer from './reducers/contactReducer'
import modalReducer from './reducers/modalReducer';
import searchReducer from './reducers/searchReducer'
const reducer = combineReducers({
    todoState: todoReducer,
    globalState: globalReducer,
    singleCardState: singleCardReducer,
    contactState: contactReducer,
    modalState: modalReducer,
    searchState: searchReducer

})
const store = createStore(reducer, applyMiddleware(thunk));
export default store
