import Vue from "vue"
import Vuex from "vuex"

//导入仓库用户数据模块
import user from "./modules/user"

//注册为组件

Vue.use(Vuex)

//创建仓库
export default new Vuex.Store({
    //挂载数据模块到仓库
    modules: {
        user
    }

})