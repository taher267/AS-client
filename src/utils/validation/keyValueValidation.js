const keyValueValidation = ({ keys = [], values = [] }) => {
  let isValid = true;
  for (const obj of values) {
    for (const key of keys) {
      if (!obj[key]?.toString?.()?.trim?.()) {
        isValid = false;
        break;
      }
    }
    if (!isValid) {
      break;
    }
  }
  return isValid;
};
export default keyValueValidation;
