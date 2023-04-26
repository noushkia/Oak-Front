export function getInCart(commodityId, cartCount) {
    if (cartCount.hasOwnProperty(commodityId)) {
        return cartCount[commodityId];
    }
    return 0;
}
