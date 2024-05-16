import { defineStore } from "pinia";
import { register, login, getUserInfo } from '@/api/userApi';

import router from "@/router";

interface Profile {
  id: string;
  name: string;
  avatar: string;
  created: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    id: null,
    token: null,
    routes: null,
    profile: null as Profile | null,
  }),

  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage, paths: ["isLoggedIn", "id", "token"] },
      { storage: sessionStorage, paths: ["profile"] }
    ],
  },

  getters: {},

  actions: {
    setLoggedIn(payload: boolean) {
      this.isLoggedIn = payload;
    },

    async registerWithNameAndPassword(userName: string, userPassword: string) {
        router.push("/");
    },

    async loginWithNameAndPassword(userName: string, userPassword: string, redirect: string) {
        try {
            const res = await login({
                username: userName,
                password: userPassword
            }) as any
    
            if (res.code === 200) {
                const { token, userId } = res.data

                this.setAuthorization({
                    id: userId,
                    token: token,
                })
                // messageSnackbar({
                //     color: 'success',
                //     message: res.message
                // })
                router.push({ path: redirect || '/' })
            }
            else {
                // messageSnackbar({
                //     color: 'error',
                //     message: res.message
                // })
            }
        } catch (error) {
            // messageSnackbar({
            //     color: 'error',
            //     message: error
            // })
        }
      router.push("/");
    },

    loginWithGoogle() {
      router.push("/");
    },

    logout() {
        this.restAuthorization()
        router.push({ name: "auth-signin" });
    },

    restAuthorization() {
        // removeToken()
        this.$patch({
            isLoggedIn: false,
            token: null,
            routes: null,
            profile: null as Profile | null,
        })
    },

    setAuthorization(auth) {
        this.$patch({
            id: auth.id,
            token: auth.token
        })
    },

    async getUserInfo() {
        const id = this.id
        if (id) {
            try {
                const { data, code } = await getUserInfo(id) as any
                if(code === 200) {
                    this.$patch({
                        isLoggedIn: true,
                        routes: data.permission,
                        profile: {
                            id: this.id,
                            name: data.name,
                            avatar: "https://avatars.githubusercontent.com/u/96679896?s=96&v=4",
                        }
                    })
                }
                else {
                    return Promise.reject(data.msg)
                }
            } catch (error) {
                console.log(error)
                return Promise.reject(error)
            }
        }
        else {
            return Promise.reject('未登录')
        }
    },
  },
});
