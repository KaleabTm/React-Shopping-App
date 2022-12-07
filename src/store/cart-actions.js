import { uiActions } from "../store/ui-slice.js";
import { cartActions } from "./cart-slice.js";

export const fetchData=()=>{
    return async(dispatch)=>{
      const fetchHandler= async()=>{
      const res = await fetch("https://redux-http-4b29e-default-rtdb.firebaseio.com/cartItems.json")
      const data = await res.json()
      return data;  
    
    }
    try{
      const cartData= await fetchHandler();
      dispatch(cartActions.replaceData(cartData))
    }
    catch(err)
    {
        dispatch(uiActions.showNotification({
            open:true,
            message:'Sending Request failed',
            type:'error',
          }))
    }


    }
}

export const sendCartData = (cart)=>{
    return async(dispatch)=>{
        dispatch(
            uiActions.showNotification({
            open:true,
            message:'Sending Request',
            type:'warning'
          }))
          
const sendRequest = async()=>{
   
    
  const res = await fetch(
    
   "https://redux-http-4b29e-default-rtdb.firebaseio.com/cartItems.json",{
    method:'PUT',
    body: JSON.stringify(cart),
  }
  
  );
  
  await res.json()
  dispatch(uiActions.showNotification({
    open:true,
    message:'Sent the request to Database Successfully',
    type:'success'
    })
    )
  }
  try{
    await sendRequest();
  }
  catch(err)
  {
    dispatch(uiActions.showNotification({
      open:true,
      message:'Sending Request failed',
      type:'error',
    }))
  }
    }
    
}