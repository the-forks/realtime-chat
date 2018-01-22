const initialState = {
    messages: [],
    user: {
        name: null
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW_MESSAGE':
            const msg = action.response;
            return {
                ...state,
                messages: [
                    ...state.messages,
                    msg
                ]
            }

        case "USER_JOINED": {
            const user = { name: action.user };
            return {
                ...state,
                user
            }
        }
        default:
            return { ...state };
            break;
    };
}

export default reducer;