export const getRadioLabel = (arr, value) => {
  const ex = arr.filter(function (item) {
    return item.value == value;
  });
  return ex[0].label;
};

export const getRadioIndex = (arr, value) => {
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (element.label == value) {
      return index;
    }
  }
  return 0;
};

export const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export const getFormattedDate = date => {
  let month = String(date.getMonth() + 1);
  let day = String(date.getDate());
  const year = String(date.getFullYear());

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return `${month}/${day}/${year}`;
};

export const removeNull = obj => {
  let newObj = {};
  Object.keys(obj).forEach(key => {
    if (obj[key] === Object(obj[key])) newObj[key] = removeEmpty(obj[key]);
    else if (obj[key] !== undefined) newObj[key] = obj[key];
  });
  return newObj;
};
