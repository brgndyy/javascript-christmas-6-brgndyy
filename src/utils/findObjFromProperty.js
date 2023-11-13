/**
 * 'slug' 값을 기준으로 객체 배열에서 해당 객체를 찾는 유틸함수
 * @param {object[]} data 객체 배열
 * @param {string} slugValue 찾고자 하는 slug의 값
 * @returns {object | undefined} 찾은 객체 또는 undefined
 */
const findObjectBySlug = (data, slugValue) => {
  return data.find((item) => item.slug === slugValue);
};

export default findObjectBySlug;
