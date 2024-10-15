import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL_FIREBASE } from "../firebase/database";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: URL_FIREBASE }),
  tagTypes: ["userImage", "userName", "categories", "items"],
  endpoints: (builder) => ({

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
    
    getItemInformation: builder.query({
      query: ({localId, categoryId, itemId}) => `users/${localId}/categories/${categoryId}/items/${itemId}.json`,
      providesTags: ["items"]
  }),

    patchImageProfile: builder.mutation({
      query: ({ image, localId }) => ({
        url: `users/${localId}.json`,
        method: "PATCH",
        body: { image },
      }),
      invalidatesTags: ["userImage"],
    }),

    patchAddImageInItemInCategory: builder.mutation({
      query: ({ localId, categoryId, itemId, image }) => ({
        url: `users/${localId}/categories/${categoryId}/items/${itemId}.json`,  // Agregar un nodo 'items'
        method: "PATCH",
        body: {
          image: image,  // Estructura el nuevo ítem como un objeto
        },
      }),
      invalidatesTags: ["items"],
    }),

    patchAddCalificationInItemInCategory: builder.mutation({
      query: ({ localId, categoryId, itemId, calification }) => ({
        url: `users/${localId}/categories/${categoryId}/items/${itemId}.json`,  // Agregar un nodo 'items'
        method: "PATCH",
        body: {
          calification: calification,  // Estructura el nuevo ítem como un objeto
        },
      }),
      invalidatesTags: ["items"],
    }),

    patchAddObservationInItemInCategory: builder.mutation({
      query: ({ localId, categoryId, itemId, observation }) => ({
        url: `users/${localId}/categories/${categoryId}/items/${itemId}.json`,  // Agregar un nodo 'items'
        method: "PATCH",
        body: {
          observation: observation,  // Estructura el nuevo ítem como un objeto
        },
      }),
      invalidatesTags: ["items"],
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



      addItemInCategory: builder.mutation({
        query: ({ localId, categoryId, newItem }) => ({
          url: `users/${localId}/categories/${categoryId}/items.json`,  // Agregar un nodo 'items'
          method: "POST",
          body: {
            name: newItem,  // Estructura el nuevo ítem como un objeto
          },
        }),
        invalidatesTags: ["items"],
      }),


      deleteItemInCategory: builder.mutation({
        query: ({ localId, categoryId, itemId }) => ({
          url: `users/${localId}/categories/${categoryId}/items/${itemId}.json`,  // Agregar un nodo 'items'
          method: "DELETE",
        }),
        invalidatesTags: ["items"],
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










    getItemsFromCategories: builder.query({
        query: ({ localId, categoryId }) => `users/${localId}/categories/${categoryId}/items.json`,
        providesTags: ["items"],
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
  useDeleteCategoryMutation,
  useAddItemInCategoryMutation,
  useGetItemsFromCategoriesQuery,
  useDeleteItemInCategoryMutation,
  usePatchAddImageInItemInCategoryMutation,
  useGetItemInformationQuery,
  usePatchAddCalificationInItemInCategoryMutation,
  usePatchAddObservationInItemInCategoryMutation
} = usersApi;
