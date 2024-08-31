import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {COLORS} from '../../lib/constants';

type ProfileIconProps = SvgProps & {
  focused?: boolean;
  width?: number;
  height?: number;
  size?: number;
  strokeWidth?: number;
};
const ProfileIcon = (props: ProfileIconProps) => (
  <Svg
    width={props.size ? props.size : props.width ?? 34}
    height={props.size ? props.size : props.height ?? 34}
    fill="none"
    {...props}>
    <Path
      stroke={props.focused ? COLORS.primary_accent : COLORS.black}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17.5 2.833C9.676 2.833 3.333 9.176 3.333 17S9.676 31.167 17.5 31.167 31.667 24.824 31.667 17 25.324 2.833 17.5 2.833Z"
    />
    <Path
      stroke={props.focused ? COLORS.primary_accent : COLORS.black}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6.55 25.99s3.158-4.032 10.95-4.032 10.95 4.032 10.95 4.032M17.5 17a4.25 4.25 0 1 0 0-8.5 4.25 4.25 0 0 0 0 8.5Z"
    />
  </Svg>
);
export default ProfileIcon;
