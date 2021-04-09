const ROUTE_PARAMETER_REGEXP = /:(\w+)/g 
const URL_FRAGEMENT_REGEXP = `([^\\/]+)`

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

        const params = []

        const parsedFrament = fragment
            .replace(
                ROUTE_PARAMETER_REGEXP,
                (match, paramName) => {
                    params.push(paramName)
                    return URL_FRAGEMENT_REGEXP
                }
            )
            .replace(/\//g, `\\/`)

        routes.push({
            testRegExp: new RegExp(`^${parsedFrament}$`),
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

        // console.log('routes', routes)
    }

    // console.log('router', router)

    return router

}