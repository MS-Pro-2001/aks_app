import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const createOfficeBearersInstance = createApi({
  reducerPath: 'api', // Unique key for the API reducer
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  endpoints: (build) => ({}), // No initial endpoints
});

export const createApiInstance = createApi({
  reducerPath: 'api', // Unique key for the API reducer
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://aks-backend.onrender.com',
  }),
  endpoints: (build) => ({}), // No initial endpoints
});
