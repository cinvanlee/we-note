import { remote } from "electron";
import _ from "lodash";
import enUS from "../locale/en-US";
import zhCN from "../locale/zh-CN";

const locales = {
    enUS,
    zhCN
};

export const getLocale = () => {
    const defaultLocale = "zh-CN";
    const electronLocale = remote.app.getLocale();
    const appLocale = window.localStorage.getItem("WE__LOCALE");
    return appLocale || electronLocale || defaultLocale;
};

export const intl = (key, params) => {
    const locale = getLocale();
    return _.get(locales[locale], key);
};
