const loadingWait = async (ms = 3000) => {
  return new Promise(r => setTimeout(r, ms));
};

const Utils = {
  loadingWait,
};

export default Utils;
