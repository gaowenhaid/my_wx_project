// 获取当前年月日
export const getNowDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const dayOfWeek = now.getDay();
  const daysOfWeek = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const weekDay = daysOfWeek[dayOfWeek];
  return `${year}-${month}-${day}-${weekDay}`
}

// 获取当前是早上还是中午还是晚上
export const getTimeFrame = () => {
  const date = new Date();
  const hour = date.getHours();
  if (hour < 12) {
    return '早上';
  } else if (hour < 18) {
    return '下午';
  } else {
    return '晚上';
  }
}