import React, { useReducer } from 'react'
import CartContext from './cart-context'

const defaultCartState = {
  items: [],
  totalAmount: 0,
}

const cartReducer = (prevState, action) => {
  if (action.type === 'ADD_ITEM') {
    const undatedTotalAmount = prevState.totalAmount + action.item.price * action.item.amount
    const existingCartItemIndex = prevState.items.findIndex((item) => item.id === action.item.id) //If exist returns the index of the item.
    const exitingCartItem = prevState.items[existingCartItemIndex]
    let updatedItems

    if (exitingCartItem) {
      const updatedItem = {
        ...exitingCartItem,
        amount: exitingCartItem.amount + action.item.amount,
      }
      updatedItems = [...prevState.items]
      updatedItems[existingCartItemIndex] = updatedItem
    } else {
      updatedItems = prevState.items.concat(action.item)
    }

    return {
      items: updatedItems,
      totalAmount: undatedTotalAmount,
    }
  }

  if (action.type === 'REMOVE_ITEM') {
    const existingCartItemIndex = prevState.items.findIndex((item) => item.id === action.id) //If exist returns the index of the item.
    const exitingCartItem = prevState.items[existingCartItemIndex]
    const undatedTotalAmount = prevState.totalAmount - exitingCartItem.price
    let updatedItems

    if (exitingCartItem.amount === 1) {
      updatedItems = prevState.items.filter((item) => item.id !== action.id)
    } else {
      const updatedItem = { ...exitingCartItem, amount: exitingCartItem.amount - 1 }
      updatedItems = [...prevState.items]
      updatedItems[existingCartItemIndex] = updatedItem
    }

    return {
      items: updatedItems,
      totalAmount: undatedTotalAmount,
    }
  }

  return defaultCartState
}

const CartProvider = ({ children }) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState)

  const addItemToCartHandler = (item) => {
    dispatchCart({ type: 'ADD_ITEM', item: item })
  }

  const removeItemFromCartHandler = (id) => {
    dispatchCart({ type: 'REMOVE_ITEM', id: id })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removedItem: removeItemFromCartHandler,
  }

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartProvider
