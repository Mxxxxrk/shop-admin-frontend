import axios from "axios";

// 专门存储用户的数据，和修改用户数据的方法
export default {

    //命名空间
    namespaced: "user",
    //初始化数据
    state: {
        username: localStorage.getItem('username') || "",
        identity: localStorage.getItem('identity') || "",
    },
    actions: {
        //登录
        login(obj, data) {
            const { commit, state } = obj;
            return new Promise((resolve, reject) => {
                axios({
                    url: "/admin/account/login",
                    method: "POST",
                    data,
                    // 处理跨域
                    withCredentials: true,
                }).then((res) => {
                    // console.log(res)
                    const { status, message } = res.data

                    // 如果登录错误
                    if (status == 1) {
                        this.$message.error(message);
                    } else {
                        //把接口返回的值更新到store
                        state.username = message.uname;
                        state.indetity = message.realname;
                        //把用户信息保存到本地存储
                        localStorage.setItem("username", message.uname)
                        localStorage.setItem("identity", message.realname)
                        resolve();
                    }

                })

            })

        },

        logout({ state }, fn) {
            axios({
                url: "/admin/account/logout",
                withCredentials: true,
            }).then(res => {
                const { status, message } = res.data
                if (status == 0) {
                    //退出请求成功，吧接口返回值更新到store
                    state.username = "";
                    state.identity = "";
                    //更新本地储存 删除
                    localStorage.removeItem("username")
                    localStorage.removeItem("identity")
                    fn();
                }
            })

        }
    }
}