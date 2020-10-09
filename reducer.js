import {
    UPDATE_PERSONA,
} from "./action";

const initialState = {
    persona: {
        Title: "",
        Name: "",
        Surname: "",
        Company: "",
        Position: "",
        Email: "",
        ID: ""
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        
        case UPDATE_PERSONA:
            return {
                ...state,
                persona: action.payload
            };
        
        // case UPDATE_PERSONAS:
        //     return {
        //         ...state,
        //         personas: action.payload
        //     };
        default:
            return state;
    }
};

export default reducer;
