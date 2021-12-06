import React, { useContext } from 'react'
import CartContext from '../../context/cart-context'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = (props) => {
  const { items } = useContext(CartContext)

  const cartItems = items.reduce((acc, item) => {
    return acc + item.amount
  }, 0)

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartItems}</span>
    </button>
  )
}

export default HeaderCartButton
