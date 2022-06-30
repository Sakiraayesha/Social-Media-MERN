const AuthReducer = (state, action) => {
    switch(action.type){
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false
            }
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false
            }
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: action.payload
            } 
        case "FOLLOW":
            return {
                ...state,
                user: {
                ...state.user,
                followings: [...state.user.followings, action.payload],
                 },
            };   
        case "UNFOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: state.user.followings.filter(
                      (following) => following !== action.payload
                    ),
                },
            };
        case "UPDATE_PROFILE_PICTURE":
            return {
                ...state,
                user: {
                    ...state.user,
                    profilePicture: action.payload,
                },
            }; 
        case "UPDATE_ACC_SETTINGS":
            return {
                ...state,
                user: {
                    ...state.user,
                    username: action.payload.username,
                    email: action.payload.email,
                    password: action.payload.password,
                },
            }; 
        case "UPDATE_USER_INFO":
            return {
                ...state,
                user: {
                    ...state.user,
                    bio: action.payload.bio,
                    city: action.payload.city,
                    from: action.payload.from,
                    relationship: action.payload.relationship
                },
            };                           
        default:
        return state;    
    }
}

export default AuthReducer;