import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";


let store = {
    _state : {
        profilePage: {
            posts : [
                {id: 1, message : 'Hi! It`s my first post!', counts: 14},
                {id: 2, message : 'How are you?', counts: 20},
                {id: 3, message : 'Weather is fine)', counts: 12}
            ],
            newPostText : "Alina"
        },
        dialogsPage: {
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
        },
        sidebar: {}     
    }, 
    _callSubscriber() {
        console.log('State changed');
    },
    getState() {
        return this._state;
    },
    subscriber(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

        this._callSubscriber(this._state);
        
    }
}

export default store;
window.store = store;