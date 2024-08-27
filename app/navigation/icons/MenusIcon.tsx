import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

type MenusIconProps = SvgProps & {
  focused?: boolean;
  width?: number;
  height?: number;
  size?: number;
  strokeWidth?: number;
};
const MenusIcon = (props: MenusIconProps) => (
  <Svg
    width={props.size ? props.size : props.width ?? 34}
    height={props.size ? props.size : props.height ?? 34}
    fill="none"
    {...props}>
    <Path
      fill={props.focused ? '#156EFF' : '#1E1E1E'}
      d="m6.698 29.75-1.983-1.983 14.52-14.521c-.425-.992-.484-2.113-.177-3.365.307-1.251.98-2.373 2.02-3.364 1.25-1.252 2.643-1.984 4.178-2.196 1.535-.213 2.786.165 3.754 1.133s1.346 2.22 1.134 3.754c-.213 1.535-.945 2.928-2.196 4.18-.992 1.038-2.113 1.711-3.365 2.018-1.251.307-2.373.248-3.364-.177L19.448 17l10.767 10.767-1.984 1.983-10.766-10.696L6.698 29.75Zm4.18-12.113-4.25-4.25C5.351 12.113 4.714 10.59 4.714 8.82c0-1.771.637-3.294 1.912-4.569l8.783 8.854-4.533 4.534Z"
    />
  </Svg>
);
export default MenusIcon;
