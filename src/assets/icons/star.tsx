import React, { FC } from "react";
import Svg, { Path, SvgProps, Mask } from "react-native-svg";

import colors from "../colors";

const Star: FC<SvgProps> = ({ fill = colors.grey65, style, width = 13, height = 11 }) => (
  <Svg style={style} width={width} height={height} viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.7403 5.05187L10.293 4.43428L8.305 0.583082C8.2507 0.477639 8.16137 0.39228 8.05102 0.340395C7.77427 0.209846 7.43797 0.318637 7.2996 0.583082L5.31156 4.43428L0.864319 5.05187C0.741709 5.06861 0.629608 5.12384 0.543781 5.20753C0.440021 5.30943 0.382844 5.44653 0.384815 5.5887C0.386786 5.73087 0.447742 5.86647 0.55429 5.96572L3.77193 8.96332L3.01175 13.1961C2.99392 13.2946 3.00532 13.3959 3.04466 13.4884C3.084 13.581 3.1497 13.6612 3.23432 13.72C3.31893 13.7787 3.41907 13.8136 3.52338 13.8207C3.62769 13.8278 3.732 13.8068 3.82448 13.7602L7.8023 11.7618L11.7801 13.7602C11.8887 13.8154 12.0148 13.8338 12.1357 13.8137C12.4405 13.7635 12.6454 13.4873 12.5928 13.1961L11.8327 8.96332L15.0503 5.96572C15.1379 5.88371 15.1957 5.77659 15.2132 5.65943C15.2605 5.36653 15.0468 5.09539 14.7403 5.05187Z"
      fill={fill}
    />
  </Svg>
);

export default Star;
