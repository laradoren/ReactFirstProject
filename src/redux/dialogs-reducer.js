const SEND_MESSEGE = "SEND-MESSEGE";

let initialState = {
    dialogs : [
        {id : 1, name : 'Ann'},
        {id : 2, name : 'Mary'},
        {id : 3, name : 'Jake'},
        {id : 4, name : 'Peter'}
    ],
    messeges : [
        {id : 1, text: 'Hi!'},
        {id : 2, text : 'How are you?'},
        {id : 3, text : ')))'},
    ],
    newMessegesBody: ''
};

const dialogsReducer = (state = initialState, action) => {   
    switch(action.type) {
        case SEND_MESSEGE: {
            let body = state.newMessegesBody;
            return {
                ...state,
                newMessegesBody : '',
                messeges: [...state.messeges, {id: 6, text: body}]
            };   
        }
        default:
            return state;
    }

}

export const addPostMessageCreator = () => ({ type: SEND_MESSEGE})

export default dialogsReducer;
