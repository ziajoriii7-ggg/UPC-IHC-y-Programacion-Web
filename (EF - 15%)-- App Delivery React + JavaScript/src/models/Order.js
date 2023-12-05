
class Order {
  /**
   * @param {Product[]} products
   * @param {string} deliveryAddress 
   * @param {string} specialPreferences 
   * @param {number} totalCost
   */
  constructor(products, deliveryAddress, specialPreferences, totalCost) {
    this.products = products;
    this.deliveryAddress = deliveryAddress;
    this.specialPreferences = specialPreferences;
    this.totalCost = totalCost;
  }
}

export default Order;
