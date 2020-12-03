import React, { FC } from "react";
import Svg, { Path, SvgProps, Mask } from "react-native-svg";

import colors from "../colors";

const Profile: FC<SvgProps> = ({ fill = colors.white, style }) => (
  <Svg style={style} width={21} height={20} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.08333 24C2.08333 24 2.08333 24 2.08333 24C2.08333 24 0 24 0 22C0 20 2.08333 14 12.5 14C22.9167 14 25 20 25 22C25 24 22.9167 24 22.9167 24H2.08333ZM12.5 12C14.1576 12 15.7473 11.3679 16.9194 10.2426C18.0915 9.11742 18.75 7.5913 18.75 6C18.75 4.4087 18.0915 2.88258 16.9194 1.75736C15.7473 0.632141 14.1576 0 12.5 0C10.8424 0 9.25269 0.632141 8.08058 1.75736C6.90848 2.88258 6.25 4.4087 6.25 6C6.25 7.5913 6.90848 9.11742 8.08058 10.2426C9.25269 11.3679 10.8424 12 12.5 12Z"
      fill={fill}
    />
  </Svg>
);

export default Profile;
