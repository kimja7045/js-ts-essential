// const container: HTMLElement | null = document.getElementById('root')
// const ajax: XMLHttpRequest = new XMLHttpRequest()
import { NewsFeed, NewsDetail } from '../types'
import { NEWS_URL, CONTENT_URL } from '../config'

function applyApiMixins(targetClass: any, baseClasses: any[]): void {
    baseClasses.forEach((baseClass) => {
        Object.getOwnPropertyNames(baseClass.prototype).forEach((name) => {
            const descripter = Object.getOwnPropertyDescriptor(
                baseClass.prototype,
                name
            )

            if (descripter) {
                Object.defineProperty(targetClass.prototype, name, descripter)
            }
        })
    })
}
export default class Api {
    xhr: XMLHttpRequest
    url: string

    constructor(url: string) {
        this.xhr = new XMLHttpRequest()
        this.url = url
    }

    getRequestWithXHR<AjaxResponse>(cb: (data: AjaxResponse) => void): void {
        this.xhr.open('GET', this.url)
        this.xhr.addEventListener('load', () => {
            cb(JSON.parse(this.xhr.response) as AjaxResponse)
        })
        this.xhr.send()
    }

    getRequestWithPromise<AjaxResponse>(
        cb: (data: AjaxResponse) => void
    ): void {
        fetch(this.url)
            .then((response) => response.json())
            .then(cb)
            .catch(() => {
                console.error('데이터를 불러오지 못했습니다.')
            })
    }
}

export class NewsFeedApi extends Api {
    constructor(url: string) {
        super(url)
    }

    getDataWithXHR(cb: (data: NewsFeed[]) => void): void {
        return this.getRequestWithXHR<NewsFeed[]>(cb)
        // return this.getRequest<NewsFeed[]>(NEWS_URL)
    }
    getDataWithPromise(cb: (data: NewsFeed[]) => void): void {
        return this.getRequestWithPromise<NewsFeed[]>(cb)
        // return this.getRequest<NewsFeed[]>(NEWS_URL)
    }
}

export class NewsDetailApi extends Api {
    constructor(url: string) {
        super(url)
    }

    getDataWithXHR(cb: (data: NewsDetail) => void): void {
        return this.getRequestWithXHR<NewsDetail>(cb)
        // return this.getRequest<NewsDetail>(CONTENT_URL.replace('@id', id))
    }
    getDataWithPromise(cb: (data: NewsDetail) => void): void {
        return this.getRequestWithPromise<NewsDetail>(cb)
        // return this.getRequest<NewsFeed[]>(NEWS_URL)
    }
}

export interface NewsFeedApi extends Api {}
export interface NewsDetailApi extends Api {}

applyApiMixins(NewsFeedApi, [Api])
applyApiMixins(NewsDetailApi, [Api])
