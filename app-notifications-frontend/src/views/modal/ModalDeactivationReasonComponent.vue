<template>
    <div>
        <div class="card bg-light mb-3">
            <div class="card-body">
                <div class="row">
                    <div class="form-group col-12">
                        <label for="exampleInputEmail1">Motivo da Inativação</label>
                        <input
                                type="text"
                                class="form-control"
                                v-model="this.reason"
                                maxlength="100"

                        />
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div class="d-flex justify-content-end">
                    <a href="#"
                       class="btn btn-success btn-spacing"
                       @click="deactivateNotificationWithReason(this.idNotification, this.reason)"
                    >Salvar</a>

                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import NotificationService from "@/application/notifications/services/NotificationService";
import NotificationDeactivatePersist from "@/application/notifications/domain/persit/NotificationDeactivatePersist";
import store from '@/application/store';

const notificationService = new NotificationService();
export default defineComponent({
    name: "ModalDeactivationReasonComponent",
    props: {
        idNotification: {
            required: true,
            type: String,
        },
    },
    data() {
        return {
            reason: "",
        };
    },
    methods: {
        deactivateNotificationWithReason(id: string, reason: string): void {
            if (reason === undefined || reason == "") {
                return;
            }

            notificationService.deactivate(id, new NotificationDeactivatePersist(reason))
                .then((response: boolean) => {
                    if (response) {
                        store.dispatch('alerts/showAlertSuccess', "Notificação ID " + id + " inativada!");
                    } else {
                        store.dispatch('alerts/showAlertWarning', "Não foi possivel inativar a Notificação ID" + id);
                    }
                    this.reason = null;
                    this.$emit('close', true);
                });
        },
    }

})
;
</script>
<style scoped>

</style>