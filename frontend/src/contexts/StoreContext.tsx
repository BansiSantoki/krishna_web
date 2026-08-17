import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { toast } from 'sonner';
import type { CartLine, Product } from '../types';
import { productById, products } from '../data/products';
import { priceBreakup } from '../utils/pricing';

export interface AppUser {
  name: string;
  email: string;
  phone: string;
}

interface StoreValue {
  cart: CartLine[];
  wishlist: string[];
  compare: string[];
  recentlyViewed: string[];
  user: AppUser | null;
  cartCount: number;
  cartSubtotal: number;
  cartGstIncluded: number;
  addToCart: (product: Product, quantity?: number, size?: string) => void;
  removeFromCart: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  toggleCompare: (product: Product) => void;
  clearCompare: () => void;
  markViewed: (product: Product) => void;
  signIn: (user: AppUser) => void;
  signOut: () => void;
  isWishlisted: (id: string) => boolean;
  isCompared: (id: string) => boolean;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: {children: React.ReactNode;}) {
  const [cart, setCart] = useState<CartLine[]>([
  { productId: products[16].id, quantity: 1 }]
  );
  const [wishlist, setWishlist] = useState<string[]>([products[3].id, products[8].id]);
  const [compare, setCompare] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [user, setUser] = useState<AppUser | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const addToCart = useCallback((product: Product, quantity = 1, size?: string) => {
    setCart((current) => {
      const existing = current.find((line) => line.productId === product.id);
      if (existing) {
        return current.map((line) =>
        line.productId === product.id ? { ...line, quantity: line.quantity + quantity, size: size ?? line.size } : line
        );
      }
      return [...current, { productId: product.id, quantity, size }];
    });
    setCartOpen(true);
    toast.success('Added to bag', { description: product.name });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((current) => current.filter((line) => line.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setCart((current) =>
    quantity <= 0 ?
    current.filter((line) => line.productId !== productId) :
    current.map((line) => line.productId === productId ? { ...line, quantity } : line)
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist((current) => {
      const has = current.includes(product.id);
      toast[has ? 'message' : 'success'](has ? 'Removed from wishlist' : 'Saved to wishlist', {
        description: product.name
      });
      return has ? current.filter((id) => id !== product.id) : [...current, product.id];
    });
  }, []);

  const toggleCompare = useCallback((product: Product) => {
    setCompare((current) => {
      if (current.includes(product.id)) return current.filter((id) => id !== product.id);
      if (current.length >= 4) {
        toast.error('Compare holds four pieces', { description: 'Remove one to add another.' });
        return current;
      }
      return [...current, product.id];
    });
  }, []);

  const clearCompare = useCallback(() => setCompare([]), []);

  const markViewed = useCallback((product: Product) => {
    setRecentlyViewed((current) => [product.id, ...current.filter((id) => id !== product.id)].slice(0, 8));
  }, []);

  const signIn = useCallback((nextUser: AppUser) => {
    setUser(nextUser);
    toast.success(`Welcome, ${nextUser.name.split(' ')[0]}`);
  }, []);

  const signOut = useCallback(() => setUser(null), []);

  const value = useMemo<StoreValue>(() => {
    const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);
    const totals = cart.reduce(
      (acc, line) => {
        const product = productById(line.productId);
        if (!product) return acc;
        const breakup = priceBreakup(product);
        return {
          subtotal: acc.subtotal + breakup.total * line.quantity,
          gst: acc.gst + breakup.gst * line.quantity
        };
      },
      { subtotal: 0, gst: 0 }
    );
    return {
      cart,
      wishlist,
      compare,
      recentlyViewed,
      user,
      cartCount,
      cartSubtotal: totals.subtotal,
      cartGstIncluded: totals.gst,
      addToCart,
      removeFromCart,
      setQuantity,
      clearCart,
      toggleWishlist,
      toggleCompare,
      clearCompare,
      markViewed,
      signIn,
      signOut,
      isWishlisted: (id: string) => wishlist.includes(id),
      isCompared: (id: string) => compare.includes(id),
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen
    };
  }, [
  cart,
  wishlist,
  compare,
  recentlyViewed,
  user,
  cartOpen,
  searchOpen,
  addToCart,
  removeFromCart,
  setQuantity,
  clearCart,
  toggleWishlist,
  toggleCompare,
  clearCompare,
  markViewed,
  signIn,
  signOut]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used inside StoreProvider');
  return context;
}