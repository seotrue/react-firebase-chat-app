import {
    SET_USER
} from "../actions/types";

const initialUserState = {
    currentUser: null,
    isLoading: true
};
export default function (state = initialUserState, actions) {
    switch (actions.type) {
        case SET_USER:
            return{
                ...state,
                currentUser: actions.payload,
                isLoading: false
            };
        default:
            return state
    }
}