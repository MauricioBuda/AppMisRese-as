import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL_FIREBASE } from "../firebase/database";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: URL_FIREBASE }),
  tagTypes: ["userImage", "userName", "categories"],
  endpoints: (builder) => ({
    patchImageProfile: builder.mutation({
      query: ({ image, localId }) => ({
        url: `users/${localId}.json`,
        method: "PATCH",
        body: { image },
      }),
      invalidatesTags: ["userImage"],
    }),

    patchNameProfile: builder.mutation({
      query: ({ name, localId }) => ({
        url: `users/${localId}.json`,
        method: "PATCH",
        body: { name },
      }),
      invalidatesTags: ["userName"],
    }),

    addCategory: builder.mutation({
        query: ({ localId, category }) => ({
          url: `users/${localId}/categories.json`,  
          method: "POST",
          body: category,
        }),
        invalidatesTags: ["categories"],
      }),
      

    // Eliminar categoría
    deleteCategory: builder.mutation({
      query: ({ localId, categoryId }) => ({
        url: `users/${localId}/categories/${categoryId}.json`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
    }),

    editCategory: builder.mutation({
        query: ({ localId, categoryId, newName }) => ({
          url: `users/${localId}/categories/${categoryId}.json`,  // URL de la categoría a editar
          method: "PATCH",
          body: { name: newName },  // Solo se envía el nuevo nombre
        }),
        invalidatesTags: ["categories"], // Invalidar el cache para que se refresque la lista de categorías
      }),

    // Obtener categorías del usuario
    getCategories: builder.query({
        query: (localId) => `users/${localId}/categories.json`,
        providesTags: ["categories"]
    }),

    getUser: builder.query({
      query: ({ localId }) => `users/${localId}.json`,
      transformResponse: (response) => {
        if (!response) return { image: "" };
        if (!response.image) response.image = "";

        return {
          ...response,
        };
      },
      providesTags: ["userImage", "userName"],
    }),
  }),
});

export const {
  usePatchImageProfileMutation,
  useGetCategoriesQuery,
  useGetUserQuery,
  usePatchNameProfileMutation,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation
} = usersApi;
