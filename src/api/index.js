import createApi from './methods'
import lottery from './modules/lottery'

const modules = {
  lottery
}

const api = createApi(modules)

export default api
