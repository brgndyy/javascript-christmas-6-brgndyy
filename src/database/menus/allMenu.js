import deepFreeze from '../../utils/deepFreeze.js';

/**
 * 각각의 카테고리를 테이블로 생각하고 카테고리 별로 합쳐서 총 데이터로 취급
 */

const ALL_MENU_DATA = deepFreeze([
  {
    id: 1,
    menu: '양송이수프',
    category: 'appetizer',
    price: 6000,
  },
  {
    id: 2,
    menu: '타파스',
    category: 'appetizer',
    price: 5500,
  },
  {
    id: 3,
    menu: '시저샐러드',
    category: 'appetizer',
    price: 8000,
  },
  {
    id: 4,
    menu: '티본스테이크',
    category: 'main',
    price: 55000,
  },
  {
    id: 5,
    menu: '바비큐립',
    category: 'main',
    price: 54000,
  },
  {
    id: 6,
    menu: '해산물파스타',
    category: 'main',
    price: 35000,
  },
  {
    id: 7,
    menu: '크리스마스파스타',
    category: 'main',
    price: 25000,
  },
  {
    id: 8,
    menu: '초코케이크',
    category: 'dessert',
    price: 15000,
  },
  {
    id: 9,
    menu: '아이스크림',
    category: 'dessert',
    price: 5000,
  },
  {
    id: 10,
    menu: '제로콜라',
    category: 'drink',
    price: 3000,
  },
  {
    id: 11,
    menu: '레드와인',
    category: 'drink',
    price: 60000,
  },
  {
    id: 12,
    menu: '샴페인',
    category: 'drink',
    price: 25000,
  },
]);

export default ALL_MENU_DATA;
