<template>
    <BaseLayout>
        <template v-slot:content>
            <div class="content p-4">
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h4>{{ $route.meta.titleHeader }}</h4>
                    </div>
                    <div class="card-body">
                        <div class="row" v-show="this.$route.name == 'update-notification' ">
                            <div class="form-group col-6">
                                <label for="exampleInputEmail1">Cadastro em:</label>
                                <Datepicker
                                        v-model="this.createdAt"
                                        :use-utc="false"
                                        :format="'dd/MM/yyyy'"
                                        locale="pt-br"
                                        show-now-button
                                        now-button-label="Hoje"
                                        cancel-text="Fechar"
                                        select-text="Selecionar"
                                        :readonly="true"
                                >
                                </Datepicker>
                            </div>
                            <div class="form-group col-6">
                                <label for="exampleInputEmail1">Última Alteração em</label>
                                <Datepicker
                                        v-model="this.updatedAt"
                                        :use-utc="false"
                                        :format="'dd/MM/yyyy'"
                                        locale="pt-br"
                                        show-now-button
                                        now-button-label="Hoje"
                                        cancel-text="Fechar"
                                        select-text="Selecionar"
                                        :readonly="true"
                                >
                                </Datepicker>
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-12">
                                <label for="exampleInputEmail1">ID</label>
                                <input
                                        type="text"
                                        class="form-control"
                                        v-model="this.id"
                                        readonly="readonly"
                                />
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-4">
                                <label for="exampleInputEmail1">Titulo</label>
                                <input
                                        type="text"
                                        class="form-control"
                                        v-model="this.title"
                                        maxlength="100"

                                />
                            </div>
                            <div class="form-group col-4">
                                <label for="exampleInputEmail1">Alias</label>
                                <input
                                        type="text"
                                        class="form-control"
                                        v-model="this.alias"
                                        maxlength="100"

                                />
                            </div>

                            <div class="form-group col-4">
                                <label for="exampleInputEmail1">Autor</label>
                                <input
                                        type="text"
                                        class="form-control"
                                        v-model="this.author"
                                        maxlength="100"

                                />
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Descritivo</label>
                                        <textarea class="form-control" rows="10" cols="50" maxlength="500"
                                                  v-model="this.description"
                                        />
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Visualizado</label>
                                                <SwitchComponent :checked-value="this.seen" v-model="this.seen"/>
                                            </div>
                                        </div>

                                        <div class="col-6">
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Data da visualização</label>
                                                <Datepicker
                                                        v-model="this.dateSeen"
                                                        :use-utc="false"
                                                        :format="'dd/MM/yyyy'"
                                                        locale="pt-br"
                                                        show-now-button
                                                        now-button-label="Hoje"
                                                        cancel-text="Fechar"
                                                        select-text="Selecionar"
                                                        :disabled="!this.seen"
                                                >
                                                </Datepicker>
                                            </div>
                                        </div>

                                        <div class="col-6">
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Publicado</label>
                                                <SwitchComponent :checked-value="this.published"
                                                                 v-model="this.published"/>
                                            </div>
                                        </div>

                                        <div class="col-6">
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Status</label>
                                                <SwitchComponent :checked-value="this.status" v-model="this.status"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="d-flex justify-content-end">

                            <a href="#"
                               class="btn btn-secondary btn-spacing"
                               @click="this.$router.push({ name: 'list-notification' })"
                            >Cancelar</a>

                            <a href="#"
                               class="btn btn-success btn-spacing"
                               @click="saveNotification()"
                            >Salvar</a>

                        </div>
                    </div>
                </div>
            </div>
        </template>
    </BaseLayout>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import BaseLayout from "@/shared/base/BaseLayout.vue";
import NotificationService from "@/application/notifications/services/NotificationService";
import dateConvert from "@/application/utils/DateConvert";
import Datepicker from "@vuepic/vue-datepicker";
import SwitchComponent from "@/shared/components/buttons/SwitchComponent.vue";
import NotificationPersist from "@/application/notifications/domain/persit/NotificationPersist";
import NotificationPersistResponse from "@/application/notifications/domain/persit/NotificationPersistResponse";
import Notification from "@/application/notifications/domain/Notification";
import store from '@/application/store';

const notificationService = new NotificationService();
export default defineComponent({
    name: "NotificationForm",
    computed: {
        dateConvert() {
            return dateConvert
        }
    },
    components: {SwitchComponent, BaseLayout, Datepicker},
    data() {
        return {
            id: "",
            title: "",
            description: "",
            author: "",
            idUser: 1,
            seen: false,
            dateSeen: "",
            alias: "",
            published: false,
            status: false,
            createdAt: "",
            updatedAt: "",
        };
    },
    methods: {
        saveNotification(): void {
            const notificationPersist: NotificationPersist = new NotificationPersist(
                this.id,
                this.title,
                this.description,
                this.author,
                Number(this.idUser),
                this.seen,
                this.dateSeen,
                this.alias,
                this.published,
                this.status,
            );
            notificationService.persist(notificationPersist).then(async (responsePersist) => {
                if (responsePersist instanceof NotificationPersistResponse) {
                    setTimeout(() => {
                        this.$router.push({name: 'list-notification'})
                    }, 3000);
                }
            });
        },
        openToUpdate(id: string): void {
            const notificationResponse = notificationService.get(id);
            notificationResponse.then((notificationToUpdate) => {
                if (notificationToUpdate instanceof Notification) {
                    console.log(notificationToUpdate)
                    this.id = notificationToUpdate.getId().toString();
                    this.title = notificationToUpdate.getNotice().getTitle();
                    this.description = notificationToUpdate.getNotice().getDescription();
                    this.author = notificationToUpdate.getNotice().getAuthor();
                    this.idUser = notificationToUpdate.getNotificationUser().getIdUser();
                    this.seen = notificationToUpdate.getNotificationUser().getSeen();
                    this.dateSeen = notificationToUpdate.getNotificationUser().getDateSeen();
                    this.alias = notificationToUpdate.getAlias();
                    this.published = notificationToUpdate.getPublished();
                    this.status = notificationToUpdate.getStatus();
                    this.createdAt = notificationToUpdate.getCreatedAt();
                    this.updatedAt = notificationToUpdate.getUpdatedAt();
                }
            });
        },
    },
    mounted(): void {
        if (this.$route.name == "update-notification") {
            if (this.$route.params.id != null) {
                this.openToUpdate(this.$route.params.id.toString());
            } else {
                store.dispatch('notifications/showAlertWarning', "Identificador não encontrado");
                this.$router.push({name: 'list-notification'});
            }
        }
    }

})

</script>

<style scoped>
.form-group {
    margin-top: 1rem;
}

.form-group > label {
    font-weight: bold;
}

.btn-spacing {
    margin-right: 0.5rem; /* Ou o valor desejado de espaçamento */
}
</style>
