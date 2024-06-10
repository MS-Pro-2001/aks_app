import { createApiInstance } from '.';

const extendedApi = createApiInstance.injectEndpoints({
  endpoints: (build) => ({
    example: build.query({
      query: () => 'test',
    }),
  }),
  overrideExisting: false,
});

export const { useExampleQuery } = extendedApi;

// import { createApiInstance } from './createApiInstance';

// import { updateCacheData, removeExtraFields } from 'utils/commonFunctions';

// const extendedApi = createApiInstance.injectEndpoints({
//   endpoints: (build) => ({
//     getUserInfo: build.query({
//       query: () => '/user/info',
//       transformResponse: (res) => {
//         return res.data;
//       },
//       providesTags: ['UserAPI'],
//     }),
//     getUserByEmpId: build.query({
//       query: (id) => `/user/infoByEmpId/${id}`,
//       transformResponse: (res) => {
//         return res.data;
//       },
//       providesTags: ['UserIdAPI'],
//     }),
//     postUpdateEmail: build.mutation({
//       query({ id, email }) {
//         return {
//           url: `/user/updateEmail/${id}`,
//           method: 'POST',
//           body: { email },
//         };
//       },
//       transformResponse: (res) => {
//         return res.data;
//       },
//       invalidatesTags: ['UserIdAPI', 'EmployeeAPI', 'UserAPI'],
//     }),
//     setUserById: build.query({
//       query: (id) => `/user/infoByEmpId/${id}`,
//       transformResponse: (res) => {
//         return res.data;
//       },
//       providesTags: ['UserIdAPI'],
//     }),
//     getQualificationByEmpId: build.query({
//       query: (id) => `/qualification/by-emp-id/${id}`,
//       transformResponse: (res) => {
//         return res.data;
//       },
//     }),
//     postPutQualification: build.mutation({
//       query(body) {
//         const filteredBody = removeExtraFields(body);
//         return {
//           url: `/qualification${body._id ? '/' + body._id + '/update' : ''}`,
//           method: body._id ? 'PUT' : 'POST',
//           body: filteredBody,
//         };
//       },
//       async onQueryStarted(patch, { dispatch, queryFulfilled, getState }) {
//         try {
//           const { data } = await queryFulfilled;
//           updateCacheData(
//             {
//               state: getState(),
//               method: 'getQualificationByEmpId',
//               dispatch,
//               extendedApi,
//             },
//             (draft) => {
//               const index = draft.findIndex((item) => {
//                 return item._id === data._id;
//               });
//               if (index !== -1) {
//                 draft.splice(index, 1, data);
//               } else {
//                 draft.push(data);
//               }
//             }
//           );
//         } catch (e) {
//           return;
//         }
//       },
//       transformResponse: (res) => {
//         return res.data;
//       },
//     }),
//     deleteQualification: build.mutation({
//       query(id) {
//         return { url: `/qualification/${id}`, method: 'DELETE' };
//       },
//       async onQueryStarted(patch, { dispatch, queryFulfilled, getState }) {
//         try {
//           const { data } = await queryFulfilled;
//           updateCacheData(
//             {
//               state: getState(),
//               method: 'getQualificationByEmpId',
//               dispatch,
//               extendedApi,
//             },
//             (draft) => {
//               const index = draft.findIndex((item) => item._id === data._id);
//               draft.splice(index, 1);
//             }
//           );
//         } catch (e) {
//           return;
//         }
//       },
//       transformResponse: (res) => {
//         return res.data;
//       },
//     }),
//     getExperienceByEmpId: build.query({
//       query: (id) => `/professional-experience/by-emp-id/${id}`,
//       transformResponse: (res) => {
//         return res.data;
//       },
//     }),
//     postPutExperience: build.mutation({
//       query(body) {
//         const filteredBody = removeExtraFields(body);
//         return {
//           url: `/professional-experience${
//             body._id ? '/' + body._id + '/update' : ''
//           }`,
//           method: body._id ? 'PUT' : 'POST',
//           body: filteredBody,
//         };
//       },
//       async onQueryStarted(patch, { dispatch, queryFulfilled, getState }) {
//         try {
//           const { data } = await queryFulfilled;
//           updateCacheData(
//             {
//               state: getState(),
//               method: 'getExperienceByEmpId',
//               dispatch,
//               extendedApi,
//             },
//             (draft) => {
//               const index = draft.findIndex((item) => {
//                 return item._id === data._id;
//               });
//               if (index !== -1) {
//                 draft.splice(index, 1, data);
//               } else {
//                 draft.push(data);
//               }
//             }
//           );
//         } catch (e) {
//           return;
//         }
//       },
//       transformResponse: (res) => {
//         return res.data;
//       },
//     }),
//     deleteExperience: build.mutation({
//       query(id) {
//         return { url: `/professional-experience/${id}`, method: 'DELETE' };
//       },
//       async onQueryStarted(patch, { dispatch, queryFulfilled, getState }) {
//         try {
//           const { data } = await queryFulfilled;
//           updateCacheData(
//             {
//               state: getState(),
//               method: 'getExperienceByEmpId',
//               dispatch,
//               extendedApi,
//             },
//             (draft) => {
//               const index = draft.findIndex((item) => item._id === data._id);
//               draft.splice(index, 1);
//             }
//           );
//         } catch (e) {
//           return;
//         }
//       },
//       transformResponse: (res) => {
//         return res.data;
//       },
//     }),
//     changePassword: build.mutation({
//       query({ id, body }) {
//         return {
//           url: `/user/change-password/${id}`,
//           method: 'POST',
//           body,
//         };
//       },
//       transformResponse: (res) => {
//         return res.data;
//       },
//     }),
//     isFirstLogin: build.mutation({
//       query({ id, body }) {
//         return {
//           url: `/user/update/${id}`,
//           method: 'PATCH',
//           body,
//         };
//       },
//     }),
//   }),
//   overrideExisting: false,
// });

// export const {
//   useGetUserInfoQuery,
//   useGetUserByEmpIdQuery,
//   useLazyGetUserInfoQuery,
//   usePostPutQualificationMutation,
//   usePostUpdateEmailMutation,
//   useGetQualificationByEmpIdQuery,
//   useDeleteQualificationMutation,
//   useGetExperienceByEmpIdQuery,
//   usePostPutExperienceMutation,
//   useDeleteExperienceMutation,
//   useChangePasswordMutation,
//   useIsFirstLoginMutation,
// } = extendedApi;
