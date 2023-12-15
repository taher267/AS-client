export default (items) => {
  if (!items) return {};
  const rules = {};

  for (const im of items.split("&")) {
    const item = im.split(/→|←/g);
    if (item.length === 3) {
      const [k, v, m] = item;
      let value = v;
      if (v === "true") {
        value = true;
      } else if (v === "false") {
        value = false;
      } else if (k === "pattern") {
        if (!isRegex(v)) {
          throw new Error(`Invalid validation pattern`);
        }
        value = new RegExp(v);
      }

      rules[k] = {
        value,
        message: m,
      };
    } else if (item.length == 2) {
      const [k, m] = item;
      rules[k] = {
        value: true,
        message: m,
      };
    } else {
      const [k] = item;
      rules[k] = {
        value: true,
        message: `${k} is mandatory!`,
      };
    }
  }
  return rules;
};

const isRegex = (str) => {
  try {
    new RegExp(str);
    return true;
  } catch (e) {
    return false;
  }
};
