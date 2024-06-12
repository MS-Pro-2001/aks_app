import { createOfficeBearersInstance } from '.';

const officeBearersApi = createOfficeBearersInstance.injectEndpoints({
  endpoints: (build) => ({
    fetchOfficeBearers: build.query({
      query: () => 'https://sheetdb.io/api/v1/c2id24dx91yp0',
      transformResponse: (res) => {
        return res;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useFetchOfficeBearersQuery } = officeBearersApi;
