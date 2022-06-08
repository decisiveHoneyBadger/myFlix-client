import { combineReducers } from 'redux';

import {
  SET_FILTER,
  SET_MOVIES,
  SET_USER,
  ADD_FAV,
  REMOVE_FAV,
} from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function user(state = '', action) {
  switch (action.type) {
    case SET_USER:
      return action.user || localStorage.getItem('user') || '';
    case ADD_FAV:
      return action.value;
    case REMOVE_FAV:
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user,
});

export default moviesApp;
