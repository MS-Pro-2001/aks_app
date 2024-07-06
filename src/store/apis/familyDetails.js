import { createApiInstance } from '.';

const extendedApi = createApiInstance.injectEndpoints({
  endpoints: (build) => ({
    fetchFamilyDetails: build.query({
      query: (body) => {
        return `api/user/fetchFamilyDetails/${body?.id}`;
      },
      transformResponse: (res) => {
        return res.reverse();
      },
      providesTags: ['FETCH_FAMILY_DETAILS'],
    }),

    // loginUser: build.mutation({
    //   query(body) {
    //     return {
    //       url: 'api/auth/login',
    //       method: 'POST',
    //       body: body,
    //     };
    //   },
    //   transformResponse: (res) => {
    //     return res;
    //   },
    // }),
    // registerUser: build.mutation({
    //   query(body) {
    //     return {
    //       url: 'api/auth/register',
    //       method: 'POST',
    //       body: body,
    //     };
    //   },
    //   transformResponse: (res) => {
    //     return res;
    //   },
    // }),

    // getSingleUser: build.mutation({
    //   query(body) {
    //     return {
    //       url: 'api/user/fetchSingelUser',
    //       method: 'POST',
    //       body: body,
    //     };
    //   },
    //   transformResponse: (res) => {
    //     return res;
    //   },
    //   // providesTags: ['UserAPI'],
    // }),
    addFamilyDetails: build.mutation({
      query(body) {
        return {
          url: '/api/user/add-family-details',
          method: 'POST',
          body: body,
        };
      },
      transformResponse: (res) => {
        return res;
      },
      invalidatesTags: ['FETCH_FAMILY_DETAILS'],
    }),
  }),

  overrideExisting: true,
});

export const {
  useFetchFamilyDetailsQuery,
  useAddFamilyDetailsMutation,
  //   useLoginUserMutation,
  //   useGetSingleUserMutation,
  //   useUpdateUserMutation,
  //   useFetchAllUsersQuery,
} = extendedApi;
