import { computed } from 'vue'
import { useStore } from 'vuex'

const mapState = (namespace) => {
    const store = useStore()
    let obj = namespace ? store.state[namespace] : store.state
    return Object.fromEntries(
        Object.keys(obj).map(k => [k,computed(()=>obj[k])])
    )
}

const mapGetters = (namespace) => {
    const store = useStore()
    return Object.fromEntries(
        Object.keys(store.getters).map(
            g => [g,computed(()=>store.getters[namespace? f`${namespace}/${g}` : g])]
        )
    )
}

const mapMutations = (namespace) => {
    const store = useStore()
    return Object.fromEntries(
        Object.keys(store._mutations).map(
            m => [m, value => store.commit(namespace ? f`${namespace}/${m}` : m, value)]
        )
    )
}

const mapActions = ()=> {
    const store = useStore()
    return Object.fromEntries(
        Object.keys(store._action).map(
            m => [m,value => store.dispatch(namespace? f`${namespace}/${a}` : a, value)]
        )
    )
}
export { mapState, mapGetters, mapMutations, mapActions }
