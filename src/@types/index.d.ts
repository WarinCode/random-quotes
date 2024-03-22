declare namespace Element {
    declare interface App {
        container: HTMLDivElement;
        quotes: HTMLQuoteElement;
        author: HTMLHeadingElement;
        button: HTMLButtonElement;
        text: HTMLParagraphElement;
    }
}

declare namespace RapidAPI {
    declare interface APIOptions {
        method: string;
        url: string;
        headers: {
            'X-RapidAPI-Key': string;
            'X-RapidAPI-Host': string;
        }
    }
    declare interface APIResponse {
        content: string;
        id: number;
        language_code: string;
        originator: {
            description: string;
            id: number;
            language_code: string;
            master_id: number;
            name: string;
            url: string;
        };
        tags: string[];
        url: string;
    }
}