import { configureStore } from '@reduxjs/toolkit'
import app from './slices/app'
import grab from './slices/grab'

const store = configureStore({
  reducer: {
    app,
    grab
  },
})

export default store