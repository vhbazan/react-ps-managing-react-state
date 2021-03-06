export default function cartReducer(cart, action) {
  switch (action.type) {
    case 'EMPTY_CART':
      return [];
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