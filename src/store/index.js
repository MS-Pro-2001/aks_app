import { configureStore } from '@reduxjs/toolkit';

import { createOfficeBearersInstance } from './apis';

const store = configureStore({
  reducer: {
    // Add the API reducer to your store
    [createOfficeBearersInstance.reducerPath]:
      createOfficeBearersInstance.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK-Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createOfficeBearersInstance.middleware),
});

export default store;
