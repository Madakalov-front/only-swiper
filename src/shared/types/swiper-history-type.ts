export type ContentDateHistoryType = {
    id: number;
    date: number;
    content: string;
    href: string;
};

export type CategoryHistoryType = {
    readonly id: number;
    category: string;
    content_category: ContentDateHistoryType[];
}[];
