/* SystemJS module definition */
declare var nodeModule: NodeModule;

// tslint:disable-next-line:interface-name
interface NodeModule {
    id: string;
}

declare var window: Window;

// tslint:disable-next-line:interface-name
interface Window {
    process: any;
    require: any;
}

declare var ace: any;
