/**
 * 출력 형식에 맞게 포매팅해주는 유틸 함수
 * @param { number } price
 */

const formatPrice = (price) => {
  return new Intl.NumberFormat('ko-KR').format(price);
};

export default formatPrice;
