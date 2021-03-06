export default function cartReducer(cart, action) {
  switch (action.type) {
    case 'EMPTY_CART':
      return [];
    case 'UPDATE_QUANTITY': {
      const { sku, quantity } = action;
      return quantity === 0
        ? cart.filter(item => item.sku !== sku)
        : cart.map(i => i.sku === sku ? { ...i, quantity } : i)
    }
    case 'ADD':
      const { id, sku } = action;
      const itemInCart = cart.find((item) => item.sku === sku);
      if (itemInCart) {
        return cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...cart,
      { id, sku, quantity: 1 }
      ];

    default:
      throw new Error("Unhandled action")
  }
}