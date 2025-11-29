import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {COLORS} from '../../lib/constants';

type HomeIconProps = SvgProps & {
  focused?: boolean;
  width?: number;
  height?: number;
  size?: number;
  strokeWidth?: number;
};
const HomeIcon = (props: HomeIconProps) => (
  <Svg
    width={props.size ? props.size : props.width ?? 34}
    height={props.size ? props.size : props.height ?? 34}
    fill="none"
    {...props}>
    <Path
      stroke={props.focused ? COLORS.primary_accent : COLORS.black}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={props.strokeWidth ?? 2}
      d="M26.75 24.917v-9.539a5.667 5.667 0 0 0-1.764-4.108l-9.034-8.58a2.834 2.834 0 0 0-3.903 0l-9.035 8.58a5.667 5.667 0 0 0-1.764 4.108v9.539a2.833 2.833 0 0 0 2.833 2.833h19.834a2.833 2.833 0 0 0 2.833-2.833Z"
    />
  </Svg>
);
export default HomeIcon;
