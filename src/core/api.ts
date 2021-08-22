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
export class Api {
    getRequest<AjaxResponse>(url: string): AjaxResponse {
        const ajax = new XMLHttpRequest()
        ajax.open('GET', url, false)
        ajax.send()

        return JSON.parse(ajax.response)
    }
}

export class NewsFeedApi {
    getData(): NewsFeed[] {
        return this.getRequest<NewsFeed[]>(NEWS_URL)
    }
}

export class NewsDetailApi {
    getData(id: string): NewsDetail {
        return this.getRequest<NewsDetail>(CONTENT_URL.replace('@id', id))
    }
}

export interface NewsFeedApi extends Api {}
export interface NewsDetailApi extends Api {}

applyApiMixins(NewsFeedApi, [Api])
applyApiMixins(NewsDetailApi, [Api])
