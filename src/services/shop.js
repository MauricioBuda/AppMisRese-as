import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL_FIREBASE } from '../firebase/database'

export const shopApi = createApi({
    reducerPath:"shopApi",
    baseQuery:fetchBaseQuery({baseUrl:URL_FIREBASE}),
    tagTypes:["userImage","categories"],
    endpoints:(builder) => ({


        getCategories: builder.query({
            query: (localId) => `users/${localId}/categories.json`,
            providesTags: ["categories"]
        }),


        getProducts:builder.query({
            query:(category) => `/products.json?orderBy="category"&equalTo="${category}"`,
            transformResponse:(response) =>{
                const data = Object.values(response)
                return data
            }
        }),


        getProduct:builder.query({
            query:(id) => `/products/${id}.json`
        }),


        patchCategory: builder.mutation({
            query: ({ category }) => ({
                url: `/categories.json`,
                method: "PATCH",
                body: {
                    [new Date().getTime()]: category // Usar timestamp como clave única
                }
            }),
            invalidatesTags: ["categories"]
        }),
        
    })


})

export const {  useGetCategoriesQuery, 
                useGetProductsQuery, 
                useGetProductQuery,
                usePatchCategoryMutation
} = shopApi
