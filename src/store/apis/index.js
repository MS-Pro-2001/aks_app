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
  endpoints: (build) => ({}), // No initial endpoints
});
