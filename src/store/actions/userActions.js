import userService from '../../services/userService'



export function loadUsers() {
  return async dispatch => {
    try {
      const users = await userService.getUsers();
      dispatch(setUsers(users));
    } catch (err) {
      console.log('UserActions: err in loadUsers', err);
    }
  }
}

export function removeUser(userId) {
  return async dispatch => {
    try {
      await userService.remove(userId);
      dispatch(_removeUser(userId));
    } catch (err) {
      console.log('UserActions: err in removeUser', err);
    }
  }
}

export function login(userCreds) {
  return async dispatch => {
    const user = await userService.login(userCreds);
    dispatch(setUser(user));
  }
}

export function signup(userCreds) {
  return async dispatch => {
    const user = await userService.signup(userCreds)
    dispatch(setUser(user))
  }
}

export function logout() {
  return async dispatch => {
    await userService.logout();
    dispatch(setUser(null));
  }
}

export function getUser() {
  return async dispatch => {
    const user = await userService.getUserFromSession();
    dispatch(setUser(user));
  }
}

export function setUser(user) {
  return { type: 'SET_USER', user }
}


function setUsers(users) {
  return { type: 'SET_USERS', users }
}

function _removeUser(userId) {
  return { type: 'USER_REMOVE', userId }
}


