import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

type RecipesIconProps = SvgProps & {
  focused?: boolean;
  width?: number;
  height?: number;
  size?: number;
  strokeWidth?: number;
};
const RecipesIcon = (props: RecipesIconProps) => (
  <Svg
    width={props.size ? props.size : props.width ?? 34}
    height={props.size ? props.size : props.height ?? 34}
    fill="none"
    {...props}>
    <Path
      stroke={props.focused ? '#156EFF' : '#1E1E1E'}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.5 17.331H4.396c0 6.529 8.214 12.141 8.214 12.141h4.89"
    />
    <Path
      stroke={props.focused ? '#156EFF' : '#1E1E1E'}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.21 18.823c0 4.811 5.403 8.361 5.403 8.361m3.887-9.853h13.104c0 6.529-8.214 12.141-8.214 12.141H17.5m-7.017-12.14c-.953-3.57 5.422-6.023 11.142-6.781l.56-1.03 2.255 2.741-1.237.201c-.606 1.99-3.637 4.868-3.637 4.868"
    />
    <Path
      stroke={props.focused ? '#156EFF' : '#1E1E1E'}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.486 17.331c.204-1.837 2.335-3.905 10.464-6.388"
    />
    <Path
      stroke={props.focused ? '#156EFF' : '#1E1E1E'}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M22.16 11.199c-3.075 1.54-6.659 3.31-9.17 6.132m9.77-5.405c-3.195 4.34-5.26 5.405-5.26 5.405m-1.767 0c1.926-1.126 6.722-5.775 6.722-5.775m1.475.098 5.773-4.678a.927.927 0 0 0-.488-1.646.928.928 0 0 0-.681.202l-5.775 4.679M21.626 10.55l1.577 1.913"
    />
  </Svg>
);
export default RecipesIcon;
