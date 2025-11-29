declare module 'react-native-config' {
  export interface NativeConfig {
    ENV?: string;
    BASE_API_URL: string;
    REACT_APP_TEST_MAIL?: string;
    REACT_APP_TEST_PASS?: string;
    GEMINI_API_KEY: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
