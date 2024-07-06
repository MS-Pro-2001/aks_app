import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const createOfficeBearersInstance = createApi({
  reducerPath: 'officeBearers', // Unique key for the API reducer
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  endpoints: (build) => ({}), // No initial endpoints
});

export const createApiInstance = createApi({
  reducerPath: 'api', // Unique key for the API reducer
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://aksbackend-production.up.railway.app',
  }),
  tagTypes: ['FETCH_ALL_USER_API', 'UPDATE_USER_API', 'FETCH_FAMILY_DETAILS'], // Add your tag types here
  endpoints: (build) => ({}), // No initial endpoints
});
