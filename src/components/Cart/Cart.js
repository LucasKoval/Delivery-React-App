import React, { useContext } from 'react'
import CartContext from '../../context/cart-context'
import Modal from '../UI/Modal'
import CartItem from './CartItem'
import classes from './Cart.module.css'

const Cart = (props) => {
  const { items, totalAmount, addItem, removedItem } = useContext(CartContext)
  const hasItems = items.length > 0
  const cartTotalAmount = `$${totalAmount.toFixed(2)}`

  const cartItemAddHandler = (item) => {
    addItem({ ...item, amount: 1 })
  }
  const cartItemRemoveHandler = (id) => {
    removedItem(id)
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  )

  return (
    <Modal onClose={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{cartTotalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  )
}

export default Cart
