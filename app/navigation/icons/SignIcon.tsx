import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

type SignIconProps = SvgProps & {
  focused?: boolean;
  width?: number;
  height?: number;
  size?: number;
  strokeWidth?: number;
};
const SignIcon = (props: SignIconProps) => (
  <Svg
    width={props.size ? props.size : props.width ?? 34}
    height={props.size ? props.size : props.height ?? 34}
    fill="none"
    {...props}>
    <Path
      fill={props.focused ? '#156EFF' : '#1E1E1E'}
      d="m19.19 18.128-5.312 5.312a1.597 1.597 0 0 1-2.258-2.258l2.59-2.588H3.188a1.594 1.594 0 0 1 0-3.188h11.024l-2.589-2.59a1.6 1.6 0 0 1 0-2.259 1.597 1.597 0 0 1 2.258 0l5.313 5.313a1.593 1.593 0 0 1-.003 2.258Zm7.372-14.41h-8.5a1.594 1.594 0 1 0 0 3.188h6.907v20.188h-6.907a1.594 1.594 0 0 0 0 3.187h8.5a1.594 1.594 0 0 0 1.594-1.593V5.313a1.594 1.594 0 0 0-1.593-1.594Z"
    />
  </Svg>
);
export default SignIcon;
