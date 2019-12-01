import createDataContext from './createDataContext';
import jsonServer from "../api/jsonServer";

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'GET_BLOGPOST':
            return action.payload;
        case 'DELETE_BLOGPOST':
            return state.filter(blogPost => blogPost.id !== action.payload);
        case 'EDIT_BLOGPOST':
            return state.map(blogPost => {
                return blogPost.id === action.payload.id ? action.payload : blogPost;
            });
        default:
            return state;
    }
};

const getBlogPost = dispatch => {
    return async () => {
        const response = await jsonServer.get('/blogposts');
        dispatch({ type: 'GET_BLOGPOST', payload: response.data })
    }
};

const addBlogPost = dispatch => {
    return async (title, content, callback) => {
        await jsonServer.post('/blogposts', { title, content });
        if (callback) {
            callback();
        }
    }
    // return (title, content, callback) => {
    //     dispatch({ type: 'ADD_BLOGPOST', payload: { title, content } }); // same as title: title and content: content
    //     if (callback) {
    //         callback();
    //     }
    // };
};

const editBlogPost = dispatch => {
    return async (id, title, content, callback) => {
        await jsonServer.put(`/blogposts/${id}`, { title, content });
        dispatch({ type: 'EDIT_BLOGPOST', payload: { id, title, content } }); // same as id: id, title: title, content: content
        if (callback) {
            callback();
        }
    };
};

const deleteBlogPost = dispatch => {
    return async (id) => {
        await jsonServer.delete(`blogposts/${id}`);
        dispatch({ type: 'DELETE_BLOGPOST', payload: id });
    }
    // return id => {
    //     dispatch({ type: 'DELETE_BLOGPOST', payload: id });
    // };
};

export const { Context, Provider } = createDataContext(
    blogReducer,
    { addBlogPost, deleteBlogPost, editBlogPost, getBlogPost },
    []
);
