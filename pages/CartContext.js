import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [rewardsBalance, setRewardsBalance] = useState(10); // Initial rewards points
  const [pointsHistory, setPointsHistory] = useState([]); // Track rewards usage and earning

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const clearCart = () => {
    setCart([]);
  };

  const removeFromCart = (itemToRemove) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item !== itemToRemove)
    );
  };

  const completeOrder = (orderDetails) => {
    const DELIVERY_FEE = 50; // Delivery fee constant

    if (cart.length > 0) {
      const total = cart.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
        0
      );

      const grandTotal =
        orderDetails.orderType === "Delivery" ? total + DELIVERY_FEE : total;

      const finalPrice = grandTotal - (orderDetails.discount || 0);

      const newOrder = {
        id: Date.now().toString(),
        date: new Date().toLocaleString(),
        items: cart, // Items in the cart
        total: parseFloat(total.toFixed(2)), // Total Price
        grandTotal: parseFloat(grandTotal.toFixed(2)), // Grand Total
        finalPrice: parseFloat(finalPrice.toFixed(2)), // Final Price after discount
        discount: orderDetails.discount || 0,
        status: "Completed",
        orderType: orderDetails.orderType || "Delivery",
        deliveryAddress: orderDetails.deliveryAddress || "N/A",
        paymentMethod: orderDetails.paymentMethod || "N/A",
        notes: orderDetails.notes || "None",
      };

      setOrderHistory((prevHistory) => [newOrder, ...prevHistory]);

      // Update rewards balance and points history
      if (orderDetails.discount > 0) {
        setRewardsBalance((prevBalance) => prevBalance - orderDetails.discount);

        setPointsHistory((prevHistory) => [
          {
            id: Date.now().toString(),
            date: new Date().toISOString().split("T")[0],
            activity: "Discount applied to order",
            points: `-${orderDetails.discount}`,
          },
          ...prevHistory,
        ]);
      }

      clearCart();
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
        removeFromCart,
        completeOrder,
        orderHistory,
        rewardsBalance,
        setRewardsBalance,
        pointsHistory,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
