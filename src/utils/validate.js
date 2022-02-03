const PrintError = type => {
  throw new Error(`state should be ${type}`);
};

export const checkStateType = (state, type) => {
  let result = false;

  switch (type) {
    case 'Array':
      Array.isArray(state) ? (result = true) : PrintError(type);
      break;
    case 'Object':
      typeof state === 'object' ? (result = true) : PrintError(type);
      break;
    case 'String':
      typeof state === 'string' ? (result = true) : PrintError(type);
      break;
  }

  return result;
};
