export default () => {
    const routes = []
    let notFound = () => {}

    const router = {}

    const checkRoutes = () => {
        console.log('router', router)
        const currentRoute = routes.find(route => {
            const _hash = window.location.hash
            if( _hash === ''){
                window.location.hash = '#/'
            }
            return _hash === route.fragment
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

    router.start = () => {
        window
            .addEventListener('hashchange', checkRoutes)

        /*if(!window.location.hash){
            window.location.hash = '#/'
        }*/

        checkRoutes()
    }

    return router

}