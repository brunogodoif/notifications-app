import {createRouter, createWebHistory} from 'vue-router';
import NotificationListing from "@/views/NotificationListing.vue";
import NotificationForm from "@/views/NotificationForm.vue";

const DEFAULT_TITLE = process.env.VUE_APP_TITLE + " - ";
const routes = [
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

router.beforeEach((to, from, next) => {
    document.title = to.meta.title as string;
    next();
});

export default router
