<template>
    <BaseLayout>
        <template v-slot:content>
            <div class="content p-4">

                <div class="card bg-light mb-3">
                    <div class="card-header"></div>
                    <div class="card-body">
                        <div class="row mb-3">
                            <div class="col-md-3">
                                <div class="input-group">
                                    <input type="text" class="form-control search-input"
                                           placeholder="Buscar título ou descrição"
                                           v-model="this.description"
                                           v-on:keyup.enter="this.listToTable()"/>
                                    <ButtonComponent :icon="'fas fa-search'" @click="this.listToTable()"/>
                                </div>
                            </div>
                            <div class="col-md-9">
                                <div class="input-group justify-content-end">
                                    <router-link to="/new-notification" class="btn btn-circle">
                                        <ButtonComponent :format="'btn-circle'" :label="'+'"/>
                                    </router-link>
                                </div>
                            </div>
                        </div>

                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Titulo</th>
                                <th scope="col">Publicação</th>
                                <th scope="col">Publicado</th>
                                <th scope="col">Status</th>
                                <th scope="col">Data de Inativação</th>
                                <th scope="col">Motivo da Inativação</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-if="(this.listingNotification.getPagination().getTotal() == 0)"
                                class="text-center">
                                <td colspan="100%"><h5>Não foram encontrados registros</h5></td>
                            </tr>
                            <tr v-for="(notification) in listingNotification.getData()"
                                :key="notification.getId()">
                                <th scope="row">{{ notification.getId() }}</th>
                                <td>{{ notification.getNotice().getTitle() }}</td>
                                <td>{{
                                    dateConvert.convertDateFromDbFormatToPatternBr(notification.getCreatedAt())
                                    }}
                                </td>
                                <td>{{ notification.getPublished() ? 'Sim' : 'Não' }}</td>
                                <td>
                                    <SwitchComponent :checked-value="notification.getStatus()"
                                                     @change="toggleSwitchStatus($event.target.checked, notification.getId().toString())"
                                    />
                                </td>
                                <td>{{
                                    dateConvert.convertDateFromDbFormatToPatternBr(notification.getInactivationDate())
                                    }}
                                </td>
                                <td>{{ notification.getInactivationReason() }}</td>
                                <td>
                                    <a class="btn btn-info btn-sm btn-spacing" v-show="!notification.getStatus()"
                                       @click="this.republishNotification(notification.getId().toString())"><i
                                            class="fas fa-refresh"></i></a>
                                    <a class="btn btn-success btn-sm btn-spacing"
                                       :href="this.$router.resolve({name: 'update-notification',params:{id:notification.getId()}}).href"><i
                                            class="fas fa-edit"></i></a>
                                    <a class="btn btn-danger btn-sm"
                                       @click="this.deleteNotification(notification.getId().toString())"><i
                                            class="fas fa-trash"></i></a>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                    </div>
                    <div class="card-footer clearfix"
                         v-show="this.listingNotification.getPagination().getTotalPages() > 1">
                        <div class="d-flex justify-content-end">
                            <PaginationComponent
                                    :maxVisibleButtons="3"
                                    :total-pages="this.listingNotification.getPagination().getTotalPages()"
                                    :total="this.listingNotification.getPagination().getTotal()"
                                    :per-page="this.listingNotification.getPagination().getLimit()"
                                    :current-page="this.listingNotification.getPagination().getPage()"
                                    @pagechanged="this.pageChange"
                            />
                        </div>
                    </div>
                </div>
                <ModalComponent
                        v-show="this.dataModalDeactivationReasonComponent.displayModalDeactivationReasonComponent"
                        :id-modal="'ModalDeactivationReasonComponent'"
                        :title="'Exemplo de Modal'"
                        @close="this.closeModal"
                >
                    <template v-slot:body>
                        <ModalDeactivationReasonComponent
                                :id-notification="this.dataModalDeactivationReasonComponent.idNotificationToModal"
                                @close="this.closeModal"
                        />
                    </template>
                </ModalComponent>
            </div>
        </template>
    </BaseLayout>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import ButtonComponent from "@/shared/components/buttons/ButtonComponent.vue";
import BaseLayout from "@/shared/base/BaseLayout.vue";
import NotificationService from "@/application/notifications/services/NotificationService";
import ListingNotificationResponse from "@/application/notifications/domain/response/ListingNotificationResponse";
import dateConvert from "@/application/utils/DateConvert";
import PaginationComponent from "@/shared/components/table/pagination/PaginationComponent.vue";
import SwitchComponent from "@/shared/components/buttons/SwitchComponent.vue";
import ModalComponent from "@/shared/components/modal/ModalComponent.vue";
import ModalDeactivationReasonComponent from "@/views/modal/ModalDeactivationReasonComponent.vue";
import store from '@/application/store';

const notificationService = new NotificationService();
export default defineComponent({
    name: "NotificationListing",
    computed: {
        dateConvert() {
            return dateConvert
        }
    },
    components: {
        ModalDeactivationReasonComponent,
        ModalComponent, SwitchComponent, PaginationComponent, BaseLayout, ButtonComponent
    },
    data() {
        return {
            description: "",
            listingNotification: ListingNotificationResponse.nullReponse(),
            dataModalDeactivationReasonComponent: {
                displayModalDeactivationReasonComponent: false,
                idNotificationToModal: "",
            }

        };
    },
    methods: {
        listToTable(page ?: number): void {
            if (page === undefined) {
                page = 1;
            }
            notificationService.list(page, process.env.VUE_APP_PAGINATION_DEFAULT_LIMIT, this.description)
                .then((response: ListingNotificationResponse) => {
                    if (response instanceof ListingNotificationResponse) {
                        this.listingNotification = response;
                    }
                });
        },
        pageChange(page: number) {
            this.listToTable(page);
        },
        showModalDeactivationReasonComponent(idNotification: string): void {
            this.dataModalDeactivationReasonComponent.displayModalDeactivationReasonComponent = true;
            this.dataModalDeactivationReasonComponent.idNotificationToModal = idNotification;
        },
        closeModal(updatedList: boolean): void {
            this.dataModalDeactivationReasonComponent.displayModalDeactivationReasonComponent = false;
            if (updatedList === true) {
                this.listToTable();
            } else {
                this.listingNotification.updateNotificationStatus(
                    this.dataModalDeactivationReasonComponent.idNotificationToModal,
                    true);
            }
        },
        deleteNotification(id: string): void {
            notificationService.delete(id).then((response) => {
                if (response === true) {
                    this.listingNotification.unsetById(id);
                    store.dispatch('notifications/showAlertSuccess', "Notificação ID " + id + " removido!");
                } else {
                    store.dispatch('notifications/showAlertWarning', "Não foi possivel remover a Notificação ID" + id);
                }
            });
        },
        republishNotification(id: string): void {
            notificationService.republish(id).then((response) => {
                if (response === true) {
                    store.dispatch('notifications/showAlertSuccess', "Notificação ID " + id + " republicada!");
                } else {
                    store.dispatch('notifications/showAlertWarning', "Não foi possivel republicar a Notificação ID" + id);
                }
                this.listToTable(this.listingNotification.getPagination().getPage())
            });
        },
        toggleSwitchStatus(newValue: boolean, id: string) {
            if (newValue == true) {
                notificationService.activate(id)
                    .then((response: boolean) => {
                        this.listToTable(this.listingNotification.getPagination().getPage());
                        store.dispatch('notifications/showAlertSuccess', "Notificação ID " + id + " ativada!");
                    });
            } else {
                this.showModalDeactivationReasonComponent(id);
                this.listingNotification.updateNotificationStatus(id, false);
            }
        },
    },
    mounted(): void {
        this.listToTable()
    }

})

</script>

<style scoped>
</style>
