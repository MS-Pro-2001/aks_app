import { createApiInstance } from '.';

const extendedApi = createApiInstance.injectEndpoints({
  endpoints: (build) => ({
    fetchAllUsers: build.query({
      query: () => 'api/user/fetchallusers',
      transformResponse: (res) => {
        return res;
      },
      providesTags: ['FETCH_ALL_USER_API'],
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

    getSingleUser: build.query({
      query: (query) => `api/user/fetchSingleUser/${query._id}`,
      transformResponse: (res) => {
        return res;
      },
      providesTags: ['UPDATE_USER_API'],
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
      invalidatesTags: ['FETCH_ALL_USER_API', 'UPDATE_USER_API'],
    }),
  }),

  overrideExisting: true,
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useFetchAllUsersQuery,
} = extendedApi;
