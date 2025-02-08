'use client';

import React, { createContext, useContext, useState, ReactNode } from "react";

// Cart item aur context ke types define karen
interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  calculateTotal: () => number;
}

// Cart context create karen
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Add to Cart with quantity increment if item exists
  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingProduct = prev.find((item) => item._id === product._id);
      
      if (existingProduct) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 } // Quantity increment
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove from Cart
  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  // Clear Cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, calculateTotal }}>
      {children}
    </CartContext.Provider>
  );
};

// Cart ko use karne ke liye custom hook
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
