
export default () => {
    const routes = []
    let notFound = () => {}

    const router = {}

    const checkRoutes = () => {
        const currentRoute = routes.find(route => {
            return window.location.hash === route.fragment
        })

        if(!currentRoute){
            notFound()
            return
        }

        currentRoute.component()
    }

    router.addRoute = (fragment, component) => {
        routes.push({
            fragment,
            component
        })

        return router
    }

    router.setNotFound = cb => {
        notFound = cb
        return router
    }

    router.navigate = fragment => {
        window.location.hash = fragment
    }

    router.start = () => {
        window
            .addEventListener('hashchange', checkRoutes)

        if(!window.location.hash){
            window.location.hash = '#/'
        }

        checkRoutes()
    }

    return router

}