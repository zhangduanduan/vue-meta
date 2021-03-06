import { isFunction } from '../utils/is-type'

export function addNavGuards(vm) {
  // return when nav guards already added or no router exists
  if (vm.$root._vueMeta.navGuards || !vm.$root.$router) {
    /* istanbul ignore next */
    return
  }

  vm.$root._vueMeta.navGuards = true

  const $router = vm.$root.$router
  const $meta = vm.$root.$meta()

  $router.beforeEach((to, from, next) => {
    $meta.pause()
    next()
  })

  $router.afterEach(() => {
    const { metaInfo } = $meta.resume()
    if (metaInfo && metaInfo.afterNavigation && isFunction(metaInfo.afterNavigation)) {
      metaInfo.afterNavigation(metaInfo)
    }
  })
}
