import { createContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    function addToCart(id, cartList, quantity = 1) {
        quantity = parseInt(quantity)
        if(cartList.length > 0) {
            console.log(cartList.find(item => item.id === id))
            if(!cartList.find(item => item.id === id)) {
                cartList.push({ id, quantity })
                localStorage.setItem('cart', JSON.stringify(cartList))
                
            } else {
                cartList.map(cartItem => {
                    if(id === cartItem.id) {
                        cartItem = Object.assign(cartItem, {quantity: cartItem.quantity + quantity})
                        console.log('to aqui')
                        return;       
                    
                }})
            }

            
        
        } else {
            cartList.push({id: id, quantity})
        }
        setCart(cartList)
        localStorage.setItem('cart', JSON.stringify(cartList))
        console.log('CART: ' + localStorage.getItem('cart')) 
        quantity = 1;       

    }

    return(
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;