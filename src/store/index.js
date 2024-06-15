import { configureStore } from '@reduxjs/toolkit';

import { createApiInstance, createOfficeBearersInstance } from './apis';
import userReducer from './user';
const store = configureStore({
  reducer: {
    // Add the API reducer to your store
    [createOfficeBearersInstance.reducerPath]:
      createOfficeBearersInstance.reducer,
    [createApiInstance.reducerPath]: createApiInstance.reducer,

    user: userReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK-Query
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    createOfficeBearersInstance.middleware,
    createApiInstance.middleware,
  ],
});

export default store;
