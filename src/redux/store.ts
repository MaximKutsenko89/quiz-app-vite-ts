import { configureStore } from '@reduxjs/toolkit'
import appReducer  from './rootSlice'

export const store = configureStore({
    reducer: {
        rootSlice:appReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;