export default function cartReducer(cart, action) {
  switch (action.type) {
    case 'EMPTY_CART':
      return [];
    default:
      return cart;
  }
}