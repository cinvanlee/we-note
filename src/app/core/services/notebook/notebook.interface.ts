export interface INote {
    uuid: string;
    title: string;
    createdAt: number;
    updatedAt: number;
    active?: boolean;
}

export interface IContent {
    title: string;
    content: string;
}

export interface INoteDetail {
    uuid: string;
    title: string;
    createdAt: number;
    updatedAt: number;
    content: string;
    tags: string[];
}
