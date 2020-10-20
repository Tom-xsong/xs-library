import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import {state,mutations,getters} from "./mutations"
import actions from "./actions"
import menu from "./modules/menu"
import role from "./modules/role"
import user from "./modules/user"
import cate from "./modules/cate"
import spec from "./modules/spec"
import goods from './modules/goods'
import seck from './modules/seck'
import banner from './modules/banner'
import vip from './modules/vip'


export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules:{
        menu,
        role,
        user,
        cate,
        spec,
        goods,
        seck,
        banner,
        vip
      
    }
})