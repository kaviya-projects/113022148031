export const validateURL = (url) => {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

export const validateShortcode = (code) => /^[a-zA-Z0-9]{3,10}$/.test(code);

export const validateValidity = (value) => {
  const v = parseInt(value, 10);
  return !isNaN(v) && v >= 1;
};
