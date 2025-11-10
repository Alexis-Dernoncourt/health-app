import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {COLORS} from '../../lib/constants';

type RegisterIconProps = SvgProps & {
  focused?: boolean;
  width?: number;
  height?: number;
  size?: number;
  strokeWidth?: number;
};
const RegisterIcon = (props: RegisterIconProps) => (
  <Svg
    width={props.size ? props.size : props.width ?? 34}
    height={props.size ? props.size : props.height ?? 34}
    fill="none"
    {...props}>
    <Path
      fill={props.focused ? COLORS.primary_accent : COLORS.black}
      d="M26.917 15.583h-8.5v-8.5a1.417 1.417 0 0 0-2.834 0v8.5h-8.5a1.417 1.417 0 0 0 0 2.834h8.5v8.5a1.417 1.417 0 0 0 2.834 0v-8.5h8.5a1.417 1.417 0 0 0 0-2.834Z"
    />
  </Svg>
);
export default RegisterIcon;
