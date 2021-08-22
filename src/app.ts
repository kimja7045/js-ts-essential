import Router from './core/router'
import { Store } from './types'
import { NewsDetailView, NewsFeedView } from './page'

const store: Store = {
    currentPage: 1,
    feeds: [],
}

declare global {
    interface Window {
        store: Store
    }
}

window.store = store

const router: Router = new Router()
const newsFeedView = new NewsFeedView('root')
const newsDetailView = new NewsDetailView('root')

router.setDefaultPage(newsFeedView)
router.addRouterPath('/page/', newsFeedView)
router.addRouterPath('/show/', newsDetailView)

router.route()
