import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items:[],
    total:0
  }

export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addItemCart: (state,action) => {
            const {id, price, quantity} = action.payload
            const itemFound = state.items.find(item => item.id === id)
            itemFound ? itemFound.quantity += quantity : state.items.push(action.payload)
            state.total+= price * quantity
        },

        deleteItemCart:(state, action)=> {
          const {id} = action.payload
          const itemFound = state.items.find(item => item.id === id)
          
          if(itemFound){
            state.total -= itemFound.price * itemFound.quantity;  // Restar del total
            state.items = state.items.filter(item => item.id !== id);  // Eliminar el item
          }
      },
        clearCart:(state) => {
            state.items = [],
            state.total = 0
        }
    }
})

export const {addItemCart, clearCart, deleteItemCart} = cartSlice.actions

export default cartSlice.reducer