"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import axios, { AxiosError } from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

// Define interfaces for your data structures
interface CartItem {
  _id: string;
  productId: {
    _id: string;
    price: number;
    imageUrl : string,
    name : string
    // Add other product properties as needed
  };
  quantity: number;
  userId: string;
}

interface AppContextValue {
  user: ReturnType<typeof useUser>["user"];
  userId: string | null | undefined;
  isLoaded: boolean;
  handleAddToCart: (params: AddToCart) => Promise<void>;
  loading: boolean;
  cartItems: CartItem[];
  totalPrice: number;
  quantityCal: string;
  setquantityCal: React.Dispatch<React.SetStateAction<string>>;
}

interface AddToCart {
  pId: string;
}

interface AppProviderProps {
  children: ReactNode;
}

// API response types
interface AddToCartResponse {
  success: boolean;
  message?: string;
}

interface CartDataResponse {
  success: boolean;
  userCartData: CartItem[];
  message?: string;
}

// Create context with proper initial value type
export const AppContext = createContext<AppContextValue>({} as AppContextValue);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { user } = useUser();
  const { userId, isLoaded } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantityCal, setquantityCal] = useState<string>("increment")

  const handleAddToCart = async ({ pId }: AddToCart): Promise<void> => {
    if (!isLoaded) {
      alert("Loading authentication...");
      return;
    }
    if (!userId) {
      alert("Please log in to add items to your cart");
      return;
    }

    try {
      const { data } = await axios.post<AddToCartResponse>(
        "/api/add-to-cart",
        {
          productId: pId,
          userId,
          quantityCal,
          quantity: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      alert(data.message || "Item added to cart!");
      // Refresh cart after adding item
      await fetchCart();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      console.error("Error adding to cart:", axiosError);
      alert(
        axiosError.response?.data?.message || "Failed to add to cart"
      );
    }
  };

  // useEffect(() => {
  //   handleAddToCart();
  // }, [quantityCal])
  
  const fetchCart = async (): Promise<void> => {
    if (!isLoaded) {
      // Don't alert here since it's called on mount
      return;
    }
    if (!userId) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get<CartDataResponse>(
        `/api/cart-data?userId=${userId}`
      );
      setCartItems(data.userCartData || []);
      
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      console.error("Error fetching cart:", axiosError);
      setCartItems([]);
      alert(
        axiosError.response?.data?.message || "Failed to fetch cart"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId, isLoaded]);

  const totalPrice = cartItems.reduce((total: number, item: CartItem) => {
    return total + (item.productId.price * item.quantity);
  }, 0);

    
  
  const value: AppContextValue = {
    user,
    userId,
    isLoaded,
    handleAddToCart,
    loading,
    cartItems,
    totalPrice,
    quantityCal, setquantityCal
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextValue => useContext(AppContext);