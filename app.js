const container = document.getElementById('root')
const ajax = new XMLHttpRequest()
const content = document.createElement('div')
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json'
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json'

const store = {
    currentPage: 1,
    feeds: [],
}
// const store: Store = {
//     currentPage: 1,
//     feeds: [],
// }

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

ajax.open('GET', NEWS_URL, false)
ajax.send()
// console.log(ajax.response)
const newsFeed = JSON.parse(ajax.response)
const ul = document.createElement('ul')
console.log(newsFeed)

window.addEventListener('hashchange', function () {
    const id = location.hash.substr(1)

    ajax.open('GET', CONTENT_URL.replace('@id', id), false)
    ajax.send()

    const newsContent = JSON.parse(ajax.response)
    const title = document.createElement('h1')

    title.innerHTML = newsContent.title
    content.appendChild(title)
    console.log(newsContent)
})

for (let i = 0; i < newsFeed.length; i++) {
    const li = document.createElement('li')
    const a = document.createElement('a')

    a.href = `#${newsFeed[i].id}`
    a.innerHTML = `${newsFeed[i].title} (${newsFeed[i].comments_count})`

    li.appendChild(a)
    ul.appendChild(li)
}
// let data = '<ul>'
// newsFeed.forEach((news) => {
//     data += `<li>${news.title}</li>`
// })
// data += '</ul>'
// root.innerHTML = data

container.appendChild(ul)
container.appendChild(content)
