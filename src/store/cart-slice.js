import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState:{
        itemList:[],
        totalQuantity:0,
        showCart:false,
        changed: false

    },
    reducers:{
        replaceData(state,action){
          state.totalQuantity= action.payload.totalPrice;
          state.itemList = action.payload.itemList
        },
        addToCart(state, action){
          state.changed=true
         const newItem = action.payload
         // to check if the item is already available
         const existingItem = state.itemList.find((item)=> item.id===newItem.id)
       if(existingItem){
        existingItem.quantity++
        existingItem.totalPrice += newItem.price
       }else{
        state.itemList.push({
            id: newItem.id,
            price: newItem.price,
            quantity:1,
            totalPrice: newItem.price,
            name: newItem.name
       })
       state.totalQuantity++
       }

        },
        removeFromCart(state, action){
          state.changed=true
          const id = action.payload

          const existingItem =state.itemList.find(item => item.id ===id )
          if (existingItem.quantity===1){
            state.itemList = state.itemList.filter(item=> item.id !==id)
            state.totalQuantity--  
        }else {
            existingItem.quantity--
            existingItem.totalPrice-=existingItem.price
          }
        },
        setShowCart(state){
            state.showCart=!state.showCart;
        }
    }
})



export const cartActions = cartSlice.actions

export default cartSlice