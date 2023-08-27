import {createRouter, createWebHistory} from 'vue-router';
import NotificationListing from "@/views/NotificationListing.vue";
import NotificationForm from "@/views/NotificationForm.vue";
import Auth from "@/views/Auth.vue";
import AuthLogout from "@/views/AuthLogout.vue";
import store from "@/application/store";

const DEFAULT_TITLE = process.env.VUE_APP_TITLE + " - ";
const routes = [
    {
        path: "/login",
        name: "login",
        component: Auth,
        meta: {
            title: DEFAULT_TITLE + "Login",
            titleHeader: "Login",
        },
    },
    {
        path: "/logout",
        name: "logout",
        component: AuthLogout,
        meta: {
            title: 'Logout',
            titleHeader: 'Logout',
        },
    },
    {
        path: '/',
        name: 'list-notification',
        component: NotificationListing,
        meta: {
            title: DEFAULT_TITLE + "Lista de Notificações",
            titleHeader: "Lista de Notificações",
        },
    },
    {
        path: '/new-notification',
        name: 'new-notification',
        component: NotificationForm,
        meta: {
            title: DEFAULT_TITLE + "Nova Notificação",
            titleHeader: "Nova Notificação",
        },
    },
    {
        path: '/update-notification/:id',
        name: 'update-notification',
        component: NotificationForm,
        meta: {
            title: DEFAULT_TITLE + "Atualização de Notificação",
            titleHeader: "Atualização Notificação",
        },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach(async (to, from, next) => {
    if (to.name === 'login') {
        next()
    } else if (to.meta && to.meta.requiresAuth === false) {
        next()
    } else if (store.getters['auth/isLoggedIn']) {

        next()
    } else {
        next({name: 'login'})
    }
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title as string;
    next();
});

export default router
