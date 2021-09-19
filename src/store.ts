import { NewsFeed, NewsStore } from './types'

export default class Store implements NewsStore {
    private feeds: NewsFeed[]
    private _currentPage: number
    constructor() {
        this.feeds = []
        this._currentPage = 1
    }

    get currentPage(): number {
        return this._currentPage
    }
    set currentPage(page: number) {
        // if (page <= 0) return
        this._currentPage = page
    }

    get nextPage(): number {
        return this._currentPage + 1
    }
    get prevPage(): number {
        return this._currentPage > 1 ? this._currentPage : 1
    }

    get numberOfFeed(): number {
        return this.feeds.length
    }

    get hasFeeds(): boolean {
        return this.feeds.length > 0
    }

    getAllFeeds(): NewsFeed[] {
        return this.feeds
    }

    getFeed(position: number): NewsFeed {
        return this.feeds[position]
    }

    setFeeds(feeds: NewsFeed[]): void {
        feeds.map((feed) => ({
            ...feed,
            read: false,
        }))
    }

    makeRead(id: number): void {
        let feed = this.getFeed(id)
        feed.read = true
        // let hasFeed: Boolean = false
        // for (let index = 0; index < this.feeds.length; index++) {
        //     let data = this.feeds[index]
        //     if (data.id === id) {
        //         hasFeed = true
        //     }
        // }
        // // const feed = this.feeds.find((feed: NewsFeed) => feed.id === id)

        // if (hasFeed) {
        //     this.getFeed(id).read = true
        // }
    }
}
