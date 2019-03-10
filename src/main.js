import Vue from 'vue'
import App from './App.vue'


// 1.引入element-ui
import ElementUI from 'element-ui';
// 2.引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';

//引入axios
import axios from 'axios';

//引入路由  用vue-router的方式
import VueRouter from "vue-router";

//导入组件
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import GoodsList from "./pages/goods/GoodsList";
import GoodsAdd from "./pages/goods/GoodsAdd";
import GoodsEdit from "./pages/goods/GoodsEdit";
import CatagoryList from "./pages/catagory/CatagoryList";
import CatagoryAdd from "./pages/catagory/CatagoryAdd";


//引入Vuex的仓库
import store from "./store";

// 3.注册插件
Vue.use(ElementUI);
Vue.use(VueRouter);

Vue.config.productionTip = false;

// 给axios给次请求自动加上域名
axios.defaults.baseURL = 'http://localhost:8899';

//配置路由
const routes = [
        { path: "/", redirect: "/admin" },
        { path: "/login", component: Login, meta: "登录" },
        {
            path: "/admin",
            component: Admin,
            meta: "管理后台",
            redirect: "/admin/goods-list",
            children: [
                { path: "goods-list", component: GoodsList, meta: "商品列表" },
                { path: "goods-add", component: GoodsAdd, meta: "添加商品" },
                { path: "goods-edit/:id", component: GoodsEdit, meta: "编辑商品" },
                { path: "catagory-list", component: CatagoryList, meta: "分类页面" },
                { path: "category-add", component: CatagoryAdd, meta: "增加分类" },
            ]
        },
    ]
    //创建路由对象
const router = new VueRouter({ routes });

//吧axios绑定到vue的原型链
Vue.prototype.$axios = axios;


new Vue({
    //挂载到根实例
    router,
    //挂载store
    store,

    render: h => h(App),
}).$mount('#app');