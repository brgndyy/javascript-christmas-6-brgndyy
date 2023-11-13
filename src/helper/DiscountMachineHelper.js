class DiscountMachineHelper {
  /**
   * 혜택 금액이 존재하지 않는 내역은 필터링
   * @param { object[] } data
   */

  static calculateTotalDataExceptZeroValue(data) {
    return Object.entries(data).reduce((acc, [title, amount]) => {
      if (amount > 0) {
        acc[title] = amount;
      }
      return acc;
    }, {});
  }

  /**
   * 메뉴 갯수에 맞춰서 할인 금액 계산 해주는 함수
   * @param { object[] } orderList
   * @param { string } saleCategory
   * @param { number } salePrice
   */

  static calculateQuantityAndPriceFromData(orderList, saleCategory, salePrice) {
    return orderList.reduce((acc, item) => {
      if (item.category === saleCategory) {
        return acc + item.quantity * salePrice;
      }
      return acc;
    }, 0);
  }

  static calculateTotalValueFromData(data) {
    return Object.values(data).reduce((acc, amount) => acc + amount, 0);
  }
}

export default DiscountMachineHelper;
