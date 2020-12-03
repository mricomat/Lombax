import React, { FC } from "react";
import Svg, { Path, SvgProps, Mask } from "react-native-svg";

import colors from "../colors";

const Search: FC<SvgProps> = ({ fill = colors.white, style }) => (
  <Svg style={style} width={19} height={21} viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.83589 21.3812C12.0182 21.3807 14.1376 20.5867 15.8567 19.1255L21.2615 25L23 23.1104L17.5952 17.2359C18.9402 15.3673 19.6713 13.0632 19.6718 10.6906C19.6718 4.79608 15.2592 0 9.83589 0C4.41263 0 0 4.79608 0 10.6906C0 16.5851 4.41263 21.3812 9.83589 21.3812ZM9.83589 2.67265C13.9043 2.67265 17.2128 6.26871 17.2128 10.6906C17.2128 15.1125 13.9043 18.7086 9.83589 18.7086C5.76752 18.7086 2.45897 15.1125 2.45897 10.6906C2.45897 6.26871 5.76752 2.67265 9.83589 2.67265Z"
      fill={fill}
    />
  </Svg>
);

export default Search;
