import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

const initialState = {
    test: 'Hello world'
}

// test reducer
function init(state = initialState, action) {
    switch(action.type) {
        default:
            return state
    }
}

const rootReducer = combineReducers({
    routing,
    init
})

export default rootReducer