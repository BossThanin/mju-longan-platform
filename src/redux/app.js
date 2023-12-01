const ACTION_SET_TOKEN = 'ACTION_SET_TOKEN'
const ACTION_SET_USER = 'ACTION_SET_USER'

export const initialStore = {
  token: null,
  user: null
}

const reducer = (state = initialStore, action) => {
  switch (action.type) {
    case ACTION_SET_TOKEN:
      return {
        ...state,
        token: action.token
      }
    case ACTION_SET_USER:
      return {
        ...state,
        user: action.user
      }
    default:
      return state
  }
}

export default reducer

export function actionSetAppToken (token) {
  return {
    type: ACTION_SET_TOKEN,
    token
  }
}

export function actionSetUser (user) {
  return {
    type: ACTION_SET_USER,
    user
  }
}
