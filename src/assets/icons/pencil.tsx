import React, { FC } from "react";
import Svg, { Path, SvgProps, Circle } from "react-native-svg";

import colors from "../colors";

const Pencil: FC<SvgProps> = ({ fill = colors.white, style, width = 25, height = 21 }) => (
  <Svg style={style} width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M33.4632 8.42105C34.1789 7.74737 34.1789 6.73684 33.4632 6.06316L29.3474 2.18947C28.6316 1.51579 27.5579 1.51579 26.8421 2.18947L23.6211 5.22105L30.4211 11.6211L33.4632 8.42105ZM1.78947 25.6V32H8.58947L28.2737 13.3053L21.6526 6.90526L1.78947 25.6ZM8.94737 0V5.05263H14.3158V8.42105H8.94737V13.4737H5.36842V8.42105H0V5.05263H5.36842V0H8.94737Z"
      fill={fill}
    />
  </Svg>
);

export default Pencil;
