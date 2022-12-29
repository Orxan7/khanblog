export function authTrue() {
    return {
      type: 'AUTH_TRUE',
    }
  }
  
export function authFalse() {
    return {
        type: 'AUTH_FALSE',
    }
}
  
export function addPosts(posts) {
  return {
    type: 'ADD_POSTS',
    payload: {
        posts: posts
    }
  }
}

export function addPost(post) {
  return {
    type: 'ADD_POST',
    payload: {
        post: post
    }
  }
}

export function deletePost(id) {
  return {
    type: 'DELETE_POST',
    payload: {
        post_id: id
    }
  }
}

export function clearPosts() {
  return {
    type: 'CLEAR_POSTS',
  }
}
