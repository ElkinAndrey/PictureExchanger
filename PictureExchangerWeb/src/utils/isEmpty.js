/** true если элемент null, undefined или пустая строка */
const isEmpty = (value) =>
  value === null || value === undefined || value === "";

export default isEmpty;
