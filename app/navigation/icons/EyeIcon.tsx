import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {COLORS} from '../../lib/constants';

type EyeIconProps = SvgProps & {
  focused?: boolean;
  width?: number;
  height?: number;
  size?: number;
  strokeWidth?: number;
};
const EyeIconOpen = (props: EyeIconProps) => (
  <Svg
    width={props.size ? props.size : props.width ?? 34}
    height={props.size ? props.size : props.height ?? 34}
    fill="none"
    {...props}>
    <Path
      fill="#000"
      d="M12 4c2.787 0 5.263 1.257 7.026 2.813.885.781 1.614 1.658 2.128 2.531.505.857.846 1.786.846 2.656 0 .87-.34 1.799-.846 2.656-.514.873-1.243 1.75-2.128 2.531C17.263 18.743 14.786 20 12 20c-2.787 0-5.263-1.257-7.026-2.813-.885-.781-1.614-1.658-2.128-2.531C2.34 13.799 2 12.87 2 12c0-.87.34-1.799.846-2.656.514-.873 1.243-1.75 2.128-2.531C6.737 5.257 9.214 4 12 4Zm0 2c-2.184 0-4.208.993-5.702 2.312-.744.656-1.332 1.373-1.729 2.047C4.163 11.049 4 11.62 4 12c0 .38.163.951.569 1.641.397.674.985 1.39 1.729 2.047C7.792 17.007 9.816 18 12 18s4.208-.993 5.702-2.312c.744-.657 1.332-1.373 1.729-2.047.406-.69.569-1.261.569-1.641 0-.38-.163-.951-.569-1.641-.397-.674-.985-1.39-1.729-2.047C16.208 6.993 14.184 6 12 6Zm0 3c.088 0 .175.004.261.011a2 2 0 0 0 2.728 2.728A3 3 0 1 1 12 9Z"
    />
  </Svg>
);

const EyeIconClosed = (props: EyeIconProps) => (
  <Svg
    width={props.size ? props.size : props.width ?? 34}
    height={props.size ? props.size : props.height ?? 34}
    fill="none"
    {...props}>
    <Path
      fill={COLORS.black}
      d="M3.05 9.31a1 1 0 1 1 1.914-.577c2.086 6.986 11.982 6.987 14.07.004a1.001 1.001 0 1 1 1.918.57 9.5 9.5 0 0 1-1.813 3.417L20.414 14A1 1 0 0 1 19 15.414l-1.311-1.311a9.1 9.1 0 0 1-2.32 1.269l.357 1.335a1 1 0 1 1-1.931.518l-.364-1.357c-.947.14-1.915.14-2.862 0l-.364 1.357a1 1 0 1 1-1.931-.518l.357-1.335a9.099 9.099 0 0 1-2.32-1.27l-1.31 1.312A1 1 0 1 1 3.585 14l1.275-1.275c-.784-.936-1.41-2.074-1.812-3.414l.002-.001Z"
    />
  </Svg>
);
export {EyeIconOpen, EyeIconClosed};
