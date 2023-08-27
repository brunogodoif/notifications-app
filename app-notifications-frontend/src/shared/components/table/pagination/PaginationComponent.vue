<template>
    <div class="pagination-container float-right">
        <ul class="pagination m-0">
            <li class="page-item"><a class="page-link" href="#" @click="onClickFirstPage" v-show="!isInFirstPage"
                                     aria-label="Go to first page">Primeira</a></li>
            <li class="page-item"><a class="page-link" href="#" @click="onClickPreviousPage" v-show="!isInFirstPage"
                                     aria-label="Go to previous page">«</a></li>
            <div v-for="page in pages" :key="page.name">
                <li class="page-item" @click="onClickPage(page.name)"
                    :disabled="page.isDisabled" :class="{ active: isPageActive(page.name) }"
                    :aria-label="`Go to page number ${page.name}`"><a class="page-link" href="#">{{ page.name }}</a>
                </li>
            </div>
            <li class="page-item"><a class="page-link" href="#" @click="onClickNextPage" v-show="!isInLastPage"
                                     aria-label="Go to next page">»</a></li>
            <li class="page-item"><a class="page-link" href="#" type="button" @click="onClickLastPage"
                                     v-show="!isInLastPage" aria-label="Go to last page">Ultima</a></li>
        </ul>
    </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    name: 'PaginationComponent',
    props: {
        maxVisibleButtons: {
            type: Number,
            required: false,
            default: 3
        },
        totalPages: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        },
        perPage: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        },
    },
    computed: {
        startPage() {
            if (this.currentPage === 1) {
                return 1;
            }

            if (this.currentPage === this.totalPages) {
                const startPage = this.totalPages - this.maxVisibleButtons + 1;
                return Math.max(startPage, 1);
            }

            const calculatedStartPage = this.currentPage - 1;
            return Math.max(calculatedStartPage, 1);

        },
        endPage() {

            return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);

        },
        pages() {
            const range = [];

            for (let i = this.startPage; i <= this.endPage; i += 1) {
                range.push({
                    name: i,
                    isDisabled: i === this.currentPage
                });
            }

            return range;
        },
        isInFirstPage() {
            return this.currentPage === 1;
        },
        isInLastPage() {
            return this.currentPage === this.totalPages;
        },
    },
    methods: {
        onClickFirstPage() {
            this.$emit('pagechanged', 1);
        },
        onClickPreviousPage() {
            this.$emit('pagechanged', this.currentPage - 1);
        },
        onClickPage(page: number) {
            this.$emit('pagechanged', page);
        },
        onClickNextPage() {
            this.$emit('pagechanged', this.currentPage + 1);
        },
        onClickLastPage() {
            this.$emit('pagechanged', this.totalPages);
        },
        isPageActive(page: number) {
            return this.currentPage === page;
        },
    },
})

</script>

<style scoped>
.pagination-container {
    text-align: right;
}
</style>