export const capitalize = value =>
  !!value ? `${value.substring(0, 1).toUpperCase()}${value.substring(1)}` : '';
