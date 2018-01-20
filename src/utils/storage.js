import store from 'store'

const set = (key, value) => store.set(key, value)
const get = key => store.get(key)
const destroy = () => store.clearAll()

export default {
  set,
  get,
  destroy
}
