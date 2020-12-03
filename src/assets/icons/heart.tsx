import React, { FC } from "react";
import Svg, { Path, SvgProps, Mask } from "react-native-svg";

import colors from "../colors";

const Heart: FC<SvgProps> = ({ fill = colors.white, style, width = 14, height = 10 }) => (
  <Svg style={style} width={width} height={height} viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M25.8291 2.08741C22.8105 -0.813735 17.7229 -0.672889 14.5248 2.39806L14.0014 2.90089L13.4779 2.39806C10.2798 -0.672889 5.19217 -0.813735 2.17356 2.08873C-0.84642 4.98987 -0.701176 9.87733 2.49556 12.9483L14 24L25.503 12.9483C28.7011 9.87733 28.8464 4.98987 25.8278 2.08873L25.8291 2.08741Z"
      fill={fill}
    />
  </Svg>
);

export default Heart;
