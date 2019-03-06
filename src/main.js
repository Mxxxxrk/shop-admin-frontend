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
import CatagoryList from "./pages/catagory/CatagoryList";


// 3.注册插件
Vue.use(ElementUI);
Vue.use(VueRouter);

Vue.config.productionTip = false;

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
                { path: "catagory-list", component: CatagoryList, meta: "分类页面" },
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

    render: h => h(App),
}).$mount('#app');