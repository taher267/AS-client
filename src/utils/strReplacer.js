export default ({ str = "", replaceBy = "", replaceOn = "" }) => {
  return str.replace(new RegExp(replaceOn, "g"), replaceBy);
};
