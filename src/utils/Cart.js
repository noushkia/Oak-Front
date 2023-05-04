export function getInCart(commodityId, itemsCount) {
    if (itemsCount.hasOwnProperty(commodityId)) {
        return itemsCount[commodityId];
    }
    return 0;
}
