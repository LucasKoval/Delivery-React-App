import React, { useState, useEffect, useContext } from 'react'
import CartContext from '../../context/cart-context'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = (props) => {
  const { items } = useContext(CartContext)
  const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false)

  const cartItems = items.reduce((acc, item) => {
    return acc + item.amount
  }, 0)

  const buttonClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ''}`

  useEffect(() => {
    if (items.length === 0) {
      return
    }
    setButtonIsHighlighted(true)
    const timer = setTimeout(() => {
      setButtonIsHighlighted(false)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [items])

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartItems}</span>
    </button>
  )
}

export default HeaderCartButton
