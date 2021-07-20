type Store = {
    currentPage: number
    feeds: NewsFeed[]
}

type NewsFeed = {
    id: number
    comments_count: number
    url: string
    time_age: string
    points: number
    title: string
    read?: boolean
}

const container: HTMLElement | null = document.getElementById('root')
const ajax: XMLHttpRequest = new XMLHttpRequest()
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json'
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json'
// const store = {
//     currentPage: 1,
//     feeds: [],
// }
const store: Store = {
    currentPage: 1,
    feeds: [],
}

function getData(url) {
    ajax.open('GET', url, false)
    ajax.send()

    return JSON.parse(ajax.response)
}

function makeFeeds(feeds) {
    for (let i = 0; i < feeds.length; i++) {
        feeds[i].read = false
    }

    return feeds
}

function newsFeed() {
    let newsFeed: NewsFeed[] = store.feeds
    const newsList = []
    let templace = `

    `
}

ajax.open('GET', NEWS_URL, false)
ajax.send()
// console.log(ajax.response)
const newsFeed = JSON.parse(ajax.response)
const ul = document.createElement('ul')
console.log(newsFeed)

for (let i = 0; i < newsFeed.length; i++) {
    const li = document.createElement('li')
    li.innerHTML = newsFeed[i].title
    ul.appendChild(li)
}
// let data = '<ul>'
// newsFeed.forEach((news) => {
//     data += `<li>${news.title}</li>`
// })
// data += '</ul>'
// root.innerHTML = data
container.appendChild(ul)
