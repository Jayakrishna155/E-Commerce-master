import React,{createContext, useEffect, useState} from 'react'
export const Shopcontext = createContext(null)
const Shopcontextprovider =(props)=>{
    const [Allproducts,setAllproducts] = useState([])
    const [cartItems,setCartItems] = useState([])
    useEffect(()=>{
       fetch("http://localhost:4000/allproducts").then((res)=>res.json()).then((data)=>{ setAllproducts(data)})

       if(localStorage.getItem('auth-token'))
       {
           fetch("http://localhost:4000/getcart",{
              method:'POST',
              headers:{
                Accept:'application/json',
                'auth-token':localStorage.getItem('auth-token'),
                'Content-Type':'application/json',
              },
              body:"",
           }).then((res)=>res.json()).then((data)=>setCartItems(data));
       }
    },[])

    const addToCart = (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token'))
        {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                },
                body: JSON.stringify({
                    'itemId': itemId
                })
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
            
        }
    }
    const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token'))
        {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                },
                body: JSON.stringify({
                    'itemId': itemId
                })
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));           
        }
    }
    const cartTotalValue=()=>{
        let totalAmt  = 0;
        for(const item in cartItems)
        {
              if(cartItems[item]>0)
              {
                 let itemInfo = Allproducts.find((product)=> product.id === Number(item));
                 totalAmt += cartItems[item]*itemInfo.new_price;
              }
        }
        return totalAmt;
    }
    const cartTotalItems=()=>{
        let cnt = 0;
        for(const item in cartItems)
        {
              if(cartItems[item]>0)
              {
                 cnt+=cartItems[item];
              }
        }
        return cnt;
    }
    const contextValue = {Allproducts,cartItems,addToCart,removeFromCart,cartTotalValue,cartTotalItems}

    return(
        <Shopcontext.Provider value={contextValue}>
            {props.children}
        </Shopcontext.Provider>
    );

}
export default Shopcontextprovider;