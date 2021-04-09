const ROUTE_PARAMETER_REGEXP = /:(\w+)/g 
const URL_FRAGEMENT_REGEXP = `([^\\/]+)`

const extractUrlParams = (route, windowHash) => {

    // console.log(route, windowHash)

    const params = {}

    if(route.params.length === 0){
        return params
    }

    const matches = windowHash
        .match(route.testRegExp)

    matches.shift()

    matches.forEach((paramValue, index) => {
        const paramName = route.params[index]
        params[paramName] = paramValue
    })

    // console.log(params)

    return params
}


export default () => {
    const routes = []
    let notFound = () => {}

    const router = {}

    const checkRoutes = () => {
        const { hash } = window.location

        const currentRoute = routes.find(route => {
            const { testRegExp } = route;
            return testRegExp.test(hash)
        })

        if(!currentRoute){
            notFound()
            return
        }

        const urlParams = extractUrlParams(
            currentRoute,
            window.location.hash
        )

        currentRoute.component(urlParams)
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

        // console.log(`^${parsedFrament}$`)

        routes.push({
            testRegExp: new RegExp(`^${parsedFrament}$`),
            component,
            params
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
            .addEventListener(
                'hashchange', 
                checkRoutes
            )

        if(!window.location.hash){
            window.location.hash = '#/'
        }

        checkRoutes()

        // console.log('routes', routes)
    }

    // console.log('router', router)

    return router

}