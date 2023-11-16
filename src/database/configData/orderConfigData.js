import deepFreeze from '../../utils/deepFreeze.js';

const ORDER_CONFIG_DATA = deepFreeze({
  min_quantity: 1,
  max_quantity: 20,
  min_discount_price: 10000,
  zero_price: 0,
  invalid_only_category: 'drink',
});

export default ORDER_CONFIG_DATA;
