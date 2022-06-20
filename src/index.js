import Honeybadger from '@honeybadger-io/js'
import { logError } from '@/error-logging.js'

export let useHoneybadger = null;

const HoneybadgerVue = {
  install (app, options) {
    if (app.config.debug) {
      console.log(`Honeybadger configured with ${options.apiKey}`)
    }
    const honeybadger = Honeybadger.configure(options)
    
    useHoneybadger = () => honeybadger;
    app.$honeybadger = honeybadger
    app.config.globalProperties.$honeybadger = honeybadger
    const chainedErrorHandler = app.config.errorHandler
    app.config.errorHandler = (error, vm, info) => {
      honeybadger.notify(error, { context: { vm: extractContext(vm), info: info } })
      if (typeof chainedErrorHandler === 'function') {
        chainedErrorHandler.call(app, error, vm, info)
      }

      if (shouldLogError(app)) {
        logError(app, error, vm, info)
      }
    }
  }
}

function shouldLogError (app) {
  if (app.config.warnHandler) {
    return true
  }

  const hasConsole = typeof console !== 'undefined'
  const isDebug = app.config.debug || process.env.NODE_ENV !== 'production'
  return hasConsole && isDebug
}

function extractContext (vm) {
  const options = vm.$options || {}
  const name = options.name || options._componentTag
  const file = options.__file
  const parentName = vm.$parent && vm.$parent.$options ? vm.$parent.$options.name : undefined
  return {
    isRoot: vm.$root === vm,
    name: name,
    props: vm.$props,
    parentName: parentName,
    file: file
  }
}

export default HoneybadgerVue
