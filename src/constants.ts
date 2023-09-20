import { ThemeConfig } from "antd";

export const APP_TOKEN_KEY = "TOKEN";
export const APP_BASE_URL = "https://localhost:8000";


export const antdThemeconfig: ThemeConfig = {
  "token": {
    "colorPrimary": "#00425c",      // Some bug, It is not able to take from css variable
    "borderRadius": 6
  }
}
