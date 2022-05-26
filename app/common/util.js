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
