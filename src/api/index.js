import user from './user'
import find from './find'
import recommend from './recommend'
import fourStep from './fourStep'
import charging from './charging'
import personalNews from './personalNews'
import material from './material'

const api = {
  user,
  find,
  recommend,
  fourStep,
  charging,
  personalNews,
  material
}

export default {
  ...api,
  install: Vue => {
    Vue.prototype.$api = api
  }
}
