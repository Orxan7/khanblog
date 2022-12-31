const initialState = {
    auth: null,
    posts: []
}

export default function reducer(state=initialState, action) {
    
    switch(action.type) {
        case 'AUTH_TRUE':
            const { id, username } = action.payload; 
            return {
                ...state,
                auth: {
                    id: id,
                    username: username,
                }
            }
        case 'AUTH_FALSE':
            return {
                ...state,
                auth: false
            }
        case 'ADD_POSTS':
            const posts = action.payload.posts; 
            return {
                ...state,
                posts: [...posts],
              }
        case 'ADD_POST':
            const new_post = action.payload.post; 
            return {
                ...state,
                posts: [...state.posts, new_post],
                }
        case 'DELETE_POST':
            const posts_after_delete = 
                state.posts
                    .filter((item)=>action.payload.post_id!==item.post_id) ; 
            return {
                ...state,
                posts: [...posts_after_delete],
                }
        case "CLEAR_POSTS":
            return {
                ...state,
                posts: []
            }
        default:
          return state;
    }
}