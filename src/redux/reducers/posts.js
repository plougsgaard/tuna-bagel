import _ from 'lodash'

export const CREATE_POST = 'tuna-bagel/posts/CREATE_POST'

const initialState = {
  posts: [
    'This is my first post',
    'I second that post!',
    'Someone just put on some bad music'
  ],
  status: null
}

const reducer = (state = initialState, { type, payload }) => {
  const { posts, status } = state
  switch (type) {
    case CREATE_POST:
      return {
        posts: _.concat(posts, payload.post)
      }
    default:
      return state
  }
}

export default reducer
