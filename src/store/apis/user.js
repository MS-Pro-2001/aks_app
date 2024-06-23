import { createApiInstance } from '.';

const extendedApi = createApiInstance.injectEndpoints({
  endpoints: (build) => ({
    fetchAllUsers: build.query({
      query: () => 'api/user/fetchallusers',
      transformResponse: (res) => {
        return res;
      },
    }),
    loginUser: build.mutation({
      query(body) {
        return {
          url: 'api/auth/login',
          method: 'POST',
          body: body,
        };
      },
      transformResponse: (res) => {
        return res;
      },
    }),
    registerUser: build.mutation({
      query(body) {
        return {
          url: 'api/auth/register',
          method: 'POST',
          body: body,
        };
      },
      transformResponse: (res) => {
        return res;
      },
    }),

    getSingleUser: build.mutation({
      query(body) {
        return {
          url: 'api/user/fetchSingelUser',
          method: 'POST',
          body: body,
        };
      },
      transformResponse: (res) => {
        return res;
      },
      // providesTags: ['UserAPI'],
    }),
    updateUser: build.mutation({
      query(body) {
        return {
          url: 'api/user/UpdateUser',
          method: 'PUT',
          body: body,
        };
      },
      transformResponse: (res) => {
        return res;
      },
      // providesTags: ['UserAPI'],
    }),
  }),

  overrideExisting: true,
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetSingleUserMutation,
  useUpdateUserMutation,
  useFetchAllUsersQuery,
} = extendedApi;
