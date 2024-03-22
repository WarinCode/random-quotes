import { AxiosError } from "axios";
import fetchAPI from "./api.ts";

import '@fontsource/ibm-plex-mono';

const app: Element.App = {
    container: document.querySelector(".container")!,
    quotes: document.querySelector(".quotes")!,
    author: document.querySelector(".author")!,
    button: document.querySelector("button")!,
    text: document.querySelector("p")!,
}

addEventListener('load', (): void => {
    app.quotes.style.display = "none";
    app.text.textContent = 'Click to search quotes.';
    app.author.style.content = "";
});

const { VITE_RAPIDAPI_KEY, VITE_RAPIDAPI_HOST, VITE_HTTP_METHOD, VITE_URL }: ImportMetaEnv = import.meta.env;
const options: RapidAPI.APIOptions = {
    method: String(VITE_HTTP_METHOD),
    url: String(VITE_URL),
    headers: {
        'X-RapidAPI-Key': String(VITE_RAPIDAPI_KEY),
        'X-RapidAPI-Host': String(VITE_RAPIDAPI_HOST)
    }
}

const loading = (callback: () => void, delay: number = 1300): void => {
    app.quotes.style.display = "none";
    app.author.style.display = "none";
    app.text.style.display = "block";
    app.text.style.textAlign = "center";
    app.text.textContent = 'Loading ...';
    app.author.id = "";
    app.quotes.id = "";
    app.quotes.textContent = "";
    app.author.textContent = "";
    setTimeout(callback, delay);
};

app.button.addEventListener('click', (): void => {
    loading(async (): Promise<void> => {
        app.text.style.display = "none";
        app.author.style.display = "block";
        app.quotes.style.display = "block";         
        app.quotes.style.textAlign = "start"; 
        app.author.id = "active";
        try {
            const { content, id, originator, tags, url }: RapidAPI.APIResponse = 
            await fetchAPI(options) as RapidAPI.APIResponse;     
            app.quotes.id = id.toString();
            app.quotes.textContent = content;
            app.author.textContent = originator.name;
            console.log(content, id, originator, tags, url)
        } catch(err: unknown){
            app.quotes.textContent = "เกิดข้อผิดพลาดขึ้น ไม่สามารถเรียกข้อมูลได้กรุณาลองใหม่อีกครั้ง";
            err instanceof AxiosError && console.error(err.message);
        }
    });
});