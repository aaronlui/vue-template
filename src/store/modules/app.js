import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  cachedViews: []
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  ADD_CACHED_VIEW: (state, route) => {
    if (state.cachedViews.includes(route.name)) return
    if (route.meta && route.meta.cache) {
      state.cachedViews.push(route.name)
    }
  },
  DEL_CACHED_VIEW: (state, route) => {
    const index = state.cachedViews.indexOf(route.name)
    if (index > -1) {
      state.cachedViews.splice(index, 1)
    }
  },
  DEL_ALL_CACHED_VIEWS: (state) => {
    state.cachedViews = []
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  addCachedView({ commit }, route) {
    commit('ADD_CACHED_VIEW', route)
  },
  delCachedView({ commit }, route) {
    commit('DEL_CACHED_VIEW', route)
  },
  delAllCachedViews({ commit }) {
    commit('DEL_ALL_CACHED_VIEWS')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
