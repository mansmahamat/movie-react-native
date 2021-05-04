import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage'
import { persistStore, persistReducer } from 'redux-persist'

import reducer from './reducers'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['wishlist'],
    whitelist: ['wishlist_serie']
}


const rootReducer = combineReducers({
    movieReducer: persistReducer(persistConfig, reducer),
    serieReducer: persistReducer(persistConfig, reducer)
})

const rootReducer_serie = combineReducers({
    serieReducer: persistReducer(persistConfig, reducer)
})

const store_serie = createStore(rootReducer_serie, applyMiddleware(thunk))
const store = createStore(rootReducer, applyMiddleware(thunk))
const appPersist = persistStore(store)
const appPersist_serie = persistStore(store_serie)
 
export { store, appPersist, appPersist_serie,  store_serie}