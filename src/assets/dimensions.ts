import deviceUtils from "src/utils/device";

export const dimensions = {
  margin: 22 * deviceUtils.deviceSizeScale,
  radius: 10,
  radiusBig: 20,
  radiusModal: 40,
  radiusCircle: 50,
} as const;

export default dimensions;
