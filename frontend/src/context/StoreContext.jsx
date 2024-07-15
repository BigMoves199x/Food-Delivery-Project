import { createContext, useState } from "react";
import { food_list } from "../../../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems,setCartItems] = useState({});

    const addToCart = (itemId) => {
        if(!cartItems[itemId]) {
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else {
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getCartTotalAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if (cartItems[item] > 0){
                let itemInfo = food_list.find((product)=>product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const calculateDeliveryFee = () => {
        const deliveryFeePerItem = 4;
        let itemCount = 0;
    
        for (const itemId in cartItems) {
            if (cartItems.hasOwnProperty(itemId) && cartItems[itemId] > 0) {
                itemCount += cartItems[itemId];
            }
        }
    
        return itemCount * deliveryFeePerItem;
    };

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getCartTotalAmount,
        calculateDeliveryFee
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
};

export default StoreContextProvider;

