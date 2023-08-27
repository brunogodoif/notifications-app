<template>
    <transition name="modal-fade">
        <div class="modal fade show" aria-modal="true"
             role="dialog" @click="closeModal($event)"
        >
            <div class="modal-dialog modal-xl" :class="this.idModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Pesquisar por {{ this.title }}</h4>
                        <button type="button" class="btn-close" aria-label="Close" @click="closeModal"
                                id="closeModal"></button>
                    </div>
                    <div class="modal-body">
                        <slot name="body">

                        </slot>
                        <div class="modal-footer justify-content-between">
                            <slot name="footer">

                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "ModalComponent",
    props: {
        idModal: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: false,
        },
    },
    data() {
        return {
            idBtnClosedModal: "closeModal"
        }
    },
    methods: {
        closeModal(evt) {
            const el = document.querySelector(".modal-dialog.modal-xl." + this.idModal);
            if ((el === evt.target || el.contains(evt.target)) || evt.target.classList.value === 'page-link') {
                if ((this.idBtnClosedModal === evt.target.id)) {
                    this.$emit('close');
                }
                return;
            }
            this.$emit('close');
        },
    },
};
</script>
<style scoped>
.modal-body {
    overflow-y: scroll;
    max-height: 75vh
}

.show {
    padding-right: 17px;
    display: block;
    background-color: #000000da;
}

.btn-close {
    padding: 0.25rem 0.5rem;
    font-size: 1rem;
    line-height: 1;
    color: #000;
    opacity: 0.5;
    background-color: transparent;
    border: none;
}

.btn-close:hover {
    color: #000;
    opacity: 0.75;
    text-decoration: none;
    cursor: pointer;
}
</style>