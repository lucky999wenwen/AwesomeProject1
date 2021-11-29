/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-11-25 16:17:30
 * @LastEditors: wanglong
 * @LastEditTime: 2021-11-25 16:36:14
 * @* : 博虹出品，抄袭必究😄
 */
export function timeFormat(time, type = 'YYYY-MM-DD') {
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  let day = time.getDate();
  day = day < 10 ? '0' + day : day;
  let hours = time.getHours();
  hours = hours < 10 ? '0' + hours : hours;
  let minute = time.getMinutes();
  minute = minute < 10 ? '0' + minute : minute;
  let second = time.getSeconds();
  second = second < 10 ? '0' + second : second;
  if (type === 'YYYY-MM-DD HH:mm:ss') {
    return (
      year + '-' + month + '-' + day + ' ' + hours + ':' + minute + ':' + second
    );
  } else if (type === 'YYYY-MM-DD HH:mm') {
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minute;
  } else if (type === 'YYYY-MM-DD HH') {
    return year + '-' + month + '-' + day + ' ' + hours;
  } else if (type === 'YYYY-MM-DD') {
    return year + '-' + month + '-' + day;
  } else if (type === 'YYYY-MM') {
    return year + '-' + month;
  } else if (type === 'YYYY') {
    return year;
  } else {
    return year + '-' + month + '-' + day;
  }
}
