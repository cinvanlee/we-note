export interface ITab {
    path: string;
    name: string;
    active?: boolean;
}

export interface IHexo {
    enable: boolean;
    dir: string
}

export interface IConfig {
    name: string;
    version: string;
    appDir: string;
    theme: string;
    font: string;
    fontSize: string;
    language: string;
    createdAt: number;
    updatedAt: number;
    tabs: ITab[],
    blogEngine: string;
    hexo: IHexo
}
