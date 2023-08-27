<template>
    <div class="row">
        <div class="form-group col-12" :class="((!this.isDetail) ? 'col-6' : 'col-12')">
            <div class="card-body p-0">
                <div class="card-header" v-show="this.showActionsCardHeader">
                    <h5 class="card-title" v-if="(this.tablePagination.getTotal() > 0)">
                        Total de {{ this.tablePagination.getTotal() }} registros
                    </h5>
                    <div class="card-tools">
                        <div class="input-group input-group">
                            <div class="input-group-append">
                                <slot name="card-header-tools">

                                </slot>
                            </div>
                        </div>
                    </div>
                </div>
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th v-for="(rowColumn) in this.tableData.getColumns()" :key="`value-${rowColumn}`">
                            {{ rowColumn.getValue() }}
                        </th>
                        <th v-show="this.showActions">
                            <span v-show="this.showActionsCaption">Ações</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="(this.tablePagination.getTotal() == 0 && this.showTableEmptyText == true)"
                        class="text-center">
                        <td colspan="100%"><h5>Não foram encontrados registros</h5></td>
                    </tr>
                    <tr v-for="(row) in this.tableData.getRows()" :key="row.getId()">
                        <td>{{ row.getId() }}</td>
                        <td v-for="(rowValue, index) in row.getRowValues()" :key="`value-${index}`">

                            <span v-if="!rowValue.getValue()">{{ rowValue.getValue() }}</span>
                            <span v-else>
                                <div v-html="rowValue.getValue()"></div>
                            </span>
                        </td>
                        <td class="text-right py-0 align-middle">
                            <div class="btn-group btn-group-sm">

                                <a v-show="this.showActionButtonDetail && !this.isDetail" class="btn btn-info"
                                   :href="getRouteDetailPath(this.routeNameToButtonDetail, {id: row.getId()})"
                                   @click="this.$emit('rowDetail', row.getId())"><i
                                        class="fas fa-eye"></i></a>

                                <a v-show="this.showActionButtonUpdate && !this.isDetail" class="btn btn-success"
                                   :href="getRouteUpdatePath(this.routeNameToButtonUpdate, {id: row.getId()})"
                                   @click="this.$emit('rowUpdate', row.getId())"><i
                                        class="fas fa-edit"></i></a>

                                <a v-show="(this.showActionButtonDelete && !this.isDetail)" class="btn btn-danger"
                                   @click="this.$emit('rowDelete', row.getId())"><i
                                        class="fas fa-trash"></i></a>

                                <span class="btn-group-sm" v-for="(button) in this.customButtonsActionsEvent"
                                      :key="`value-${button}`">
                                    <a :class=button.getBtnTypeCss()
                                       @click="this.$emit(button.getEventEmit(), row.getId())"><i
                                            :class="button.getBtnIconCss()"></i>
                                    </a>
                                </span>

                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="card-footer clearfix" v-show="this.showActionsCardFooter">
                    <slot name="card-footer-tools">

                    </slot>
                    <h5 class="card-title" v-if="(this.tablePagination.getTotal() > 0)">
                        Total de {{ this.tablePagination.getTotal() }} registros
                    </h5>

                    <PaginationComponent
                            :maxVisibleButtons="3"
                            :total-pages="this.tablePagination.getTotalPages()"
                            :total="this.tablePagination.getTotal()"
                            :per-page="this.tablePagination.getLimit()"
                            :current-page="this.tablePagination.getPage()"
                            @pagechanged="this.emitPageChange"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">

import {defineComponent} from "vue";
import TableData from "@/shared/components/table/TableData";
import PaginationResponse from "@/application/notifications/domain/response/PaginationResponse";
import CustomButtonTableActionEvent from "@/shared/components/table/CustomButtonTableActionEvent";
import PaginationComponent from "@/shared/components/table/pagination/PaginationComponent.vue";

export default defineComponent({
    name: "TableComponent",
    components: {PaginationComponent},
    props: {
        tableData: {
            type: Array<TableData>,
            required: true,
            default: Array<TableData>(),
        },
        tablePagination: {
            type: PaginationResponse,
            required: false,
            default: PaginationResponse.nullPagination()
        },
        showTableEmptyText: {
            type: Boolean,
            required: false,
            default: true
        },
        isDetail: {
            type: Boolean,
            required: true
        },
        showActions: {
            type: Boolean,
            required: true,
            default: true
        },
        showActionsCaption: {
            type: Boolean,
            required: true,
            default: true
        },
        showActionButtonUpdate: {
            type: Boolean,
            required: true,
            default: false
        },
        routeNameToButtonUpdate: {
            type: String,
            required: true,
            default: null
        },
        showActionButtonDetail: {
            type: Boolean,
            required: true,
            default: false
        },
        routeNameToButtonDetail: {
            type: String,
            required: true,
            default: null
        },
        showActionButtonDelete: {
            type: Boolean,
            required: true,
            default: false
        },
        showActionsCardHeader: {
            type: Boolean,
            required: true,
            default: true
        },
        showActionsCardFooter: {
            type: Boolean,
            required: true,
            default: true
        },
        customButtonsActionsEvent: {
            type: Array<CustomButtonTableActionEvent>,
            required: false,
            default: Array<CustomButtonTableActionEvent>(),
        }
    },
    emits: ['modalOpen', 'rowDetail', 'rowUpdate', 'rowDelete', 'pageChanged'],
    data() {
        return {
            list: [],
            examCategoryTypePersist: ""
        }
    },
    methods: {
        emitPageChange(page: string) {
            this.$emit('pageChanged', page);
        },
        getRoutePath(routeName: string, params: any): string {
            try {
                if (routeName != null) {
                    const {href} = this.$router.resolve({name: routeName, params});
                    return href;
                }
            } catch (err: any) {
                console.log(err);
                return ""
            }
        },
        getRouteDetailPath(routeName: string, params: any): string {
            if (routeName != null) {
                return this.getRoutePath('Detail' + routeName, params);
            }

        },
        getRouteUpdatePath(routeName: string, params: any): string {
            if (routeName != null) {
                return this.getRoutePath('Update' + routeName, params);
            }
        }
    },

});

</script>