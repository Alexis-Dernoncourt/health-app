import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

type EyeIconProps = SvgProps & {
  focused?: boolean;
  width?: number;
  height?: number;
  size?: number;
  strokeWidth?: number;
};
const EyeIcon = (props: EyeIconProps) => (
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
export default EyeIcon;
