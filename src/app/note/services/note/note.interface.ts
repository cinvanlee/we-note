export interface INote {
    uuid: string;
    title: string;
    created_at: number;
    updated_at: number;
    active?: boolean;
}

export interface IContent {
    title: string;
    content: string;
}

export interface INoteDetail {
    uuid: string;
    title: string;
    created_at: number;
    updated_at: number;
    content: string;
    tags: string[];
}
