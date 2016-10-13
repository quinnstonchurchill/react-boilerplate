import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistState } from 'redux-devtools'
import DevTools from 'redux-devtools'
// import createLogger from 'redux-logger'
import { hashHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers'

// const logger = createLogger({
//     level: 'info',
//     collapsed: true,
// })

// connect react-router to redux store
const router = routerMiddleware(hashHistory)

// redux devtools config
const enhancer = compose(
    applyMiddleware(thunk, router),
    DevTools.instrument(),
    persistState(
        window.location.href.match(/[?&]debug_session=([^&#]+)\b/)
    )
)

export default function configureStore(initialState) {

    const store = createStore(rootReducer, initialState, enhancer)

    if (module.hot) {
        module.hot.accept('../reducers', () =>
            store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
        )
    }

  return store
}