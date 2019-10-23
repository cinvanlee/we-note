import history from "./history";
import stores from '../stores';

export const navigateTo = site => {
    stores.tabBar.open(site);
    history.push(site.url);
};
