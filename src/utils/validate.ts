export function isvalidUsername(str) {
  // const valid_map = ['admin', 'test']
  // return valid_map.indexOf(str.trim()) >= 0
  return str.trim().length
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}
// 校验汉字名
export function validateName(str) {
  const rep = /^[\u4E00-\u9FA5]{2,4}$/;
  return rep.test(str);
}
// 校验手机号
export function validatePhone(str) {
  const phoneRep = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/;
  return phoneRep.test(str);
}
// 校验邮箱
export function validateEmail(str) {
  const rep = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  return rep.test(str);
}
// 验证车牌号
export function validateCarNum(str){
  const regExp = /(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$)/;
  return regExp.test(str);
}
// 校验数字
export function validateNum(str){
  const rep = /^[0-9]+(.[0-9]{1,3})?$/;
  return rep.test(str);
}
// 验证身份证号
export function validateCardId(str){
  const rep=/^\d{15}|\d{}18$/
  return rep.test(str);
}

