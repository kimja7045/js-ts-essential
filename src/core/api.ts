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
    ajax: XMLHttpRequest
    url: string

    constructor(url: string) {
        this.ajax = new XMLHttpRequest()
        this.url = url
    }

    getRequest<AjaxResponse>(cb: (data: AjaxResponse) => void): void {
        this.ajax.open('GET', this.url)
        this.ajax.addEventListener('load', () => {
            cb(JSON.parse(this.ajax.response) as AjaxResponse)
        })
        this.ajax.send()
    }
}

export class NewsFeedApi extends Api {
    constructor(url: string) {
        super(url)
    }

    getData(cb: (data: NewsFeed[]) => void): void {
        return this.getRequest<NewsFeed[]>(cb)
        // return this.getRequest<NewsFeed[]>(NEWS_URL)
    }
}

export class NewsDetailApi extends Api {
    constructor(url: string) {
        super(url)
    }

    getData(cb: (data: NewsDetail) => void): void {
        return this.getRequest<NewsDetail>(cb)
        // return this.getRequest<NewsDetail>(CONTENT_URL.replace('@id', id))
    }
}

export interface NewsFeedApi extends Api {}
export interface NewsDetailApi extends Api {}

applyApiMixins(NewsFeedApi, [Api])
applyApiMixins(NewsDetailApi, [Api])
