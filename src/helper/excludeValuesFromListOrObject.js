export const exclueValuesFromListOrObject = (data, values) => {
  let finalData;
  if (Array.isArray(data)) {
    return data?.map((item) => exclueValuesFromListOrObject(item, values));
  } else {
    finalData = { ...data };
    values.forEach((value) => delete finalData[value]);
  }

  return finalData;
};
