import router from './router'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
import { useAuthStore } from '@/stores/authStore'
import { useSnackbarStore } from "@/stores/snackbarStore";

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/auth/signin', '/auth/signup', '/404', ] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    
    const auth = useAuthStore()

    // NProgress.start()

    // document.title = getPageTitle(to.meta.title)

    // determine whether the user has logged in
    const hasToken = auth.token ?? ""

    if (hasToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/' })
            // NProgress.done()
        } else {
            
            if (auth.profile) {
                next()
            } else {
                try {
                    // get user info
                    await auth.getUserInfo()

                    next({ ...to }) // 解决不在首页退出登录后登下一个账号白页问题
                } catch (error) {
                    // remove token and go to login page to re-login
                    await auth.restAuthorization()
                    // 这里要调用组件提示
                    const snackbarStore = useSnackbarStore();
                    snackbarStore.showErrorMessage(error || 'Has Error');
                    // Message.error(error || 'Has Error')
                    console.log(error);
                    next(`/login?redirect=${to.path}`)
                    // NProgress.done()
                }
            }
        }
    } else {
        /* has no token*/

        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/auth/signin?redirect=${to.path}`)
            // NProgress.done()
        }
    }
})

router.afterEach(() => {
    // NProgress.done()
})