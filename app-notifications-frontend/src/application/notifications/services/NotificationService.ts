import {apiClient} from "@/application/utils/RestResource";
import INotificationService from "@/application/notifications/services/interfaces/INotificationService";
import NotificationDeactivatePersist from "@/application/notifications/domain/persit/NotificationDeactivatePersist";
import NotificationPersist from "@/application/notifications/domain/persit/NotificationPersist";
import Notification from "@/application/notifications/domain/Notification";
import ListingNotificationResponse from "@/application/notifications/domain/response/ListingNotificationResponse";
import PaginationResponse from "@/application/notifications/domain/response/PaginationResponse";
import ListNotificationsException from "@/application/notifications/services/exceptions/ListNotificationsException";
import {AxiosResponse} from "axios";
import ActivateNotificationException
    from "@/application/notifications/services/exceptions/ActivateNotificationException";
import DeactivateNotificationException
    from "@/application/notifications/services/exceptions/DeactivateNotificationException";
import DeleteNotificationException from "@/application/notifications/services/exceptions/DeleteNotificationException";
import GetNotificationException from "@/application/notifications/services/exceptions/GetNotificationException";
import RepublishNotificationException
    from "@/application/notifications/services/exceptions/RepublishNotificationException";
import InvalidNotificationDataException
    from "@/application/notifications/services/exceptions/InvalidNotificationDataException";
import PersistNotificationException from "@/application/notifications/services/exceptions/PersistNotificationException";
import NotificationPersistResponse from "@/application/notifications/domain/persit/NotificationPersistResponse";
import store from '@/application/store';

const DEFAULT_URL = "notifications";

export default class NotificationService implements INotificationService {
    public async activate(id: string): Promise<boolean> {
        const resource = "/" + id + "/activate";
        return await apiClient.patch(DEFAULT_URL + resource).then((responseRequest): boolean => {
            return responseRequest.data;
        }).catch((err: any) => {
            console.log(err)
            throw new ActivateNotificationException(err, err.response.status);
        });
    }

    public async deactivate(id: string, notificationDeactivatePersist: NotificationDeactivatePersist): Promise<boolean> {
        const resource = "/" + id + "/deactivate";
        return await apiClient.patch(DEFAULT_URL + resource, notificationDeactivatePersist).then((responseRequest): boolean => {
            return responseRequest.data;
        }).catch((err: any) => {
            console.log(err)
            throw new DeactivateNotificationException(err, err.response.status);
        });
    }

    public async delete(id: string): Promise<boolean> {
        const resource = "/" + id;
        return await apiClient.delete(DEFAULT_URL + resource).then((responseRequest) => {
            return responseRequest.data;
        }).catch((err: any) => {
            throw new DeleteNotificationException(err.response.data.message, err.response.status);
        });
    }

    public async get(id: string): Promise<Notification> {
        const resource = "/" + id;
        return await apiClient.get(DEFAULT_URL + resource).then((responseRequest) => {
            return Notification.fromApi(responseRequest.data);
        }).catch((err: any) => {
            throw new GetNotificationException(err.response.data.message, err.response.status);
        });
    }

    public async insert(notificationPersist: NotificationPersist): Promise<AxiosResponse<any>> {
        return await apiClient.post(DEFAULT_URL, notificationPersist);
    }


    public async persist(notificationPersist: NotificationPersist): Promise<NotificationPersistResponse> {
        if (notificationPersist === null) {
            throw new InvalidNotificationDataException("Dados inválidos...");
        }
        let persistRequest: Promise<any>;
        if (!notificationPersist.getId().toString()) {
            persistRequest = this.insert(notificationPersist);
        } else {
            persistRequest = this.update(notificationPersist, notificationPersist.getId());
        }

        return await persistRequest.then((responseRequest) => {
            const responseData = NotificationPersistResponse.fromApi(responseRequest.data);
            store.dispatch('alerts/showAlertByStatusHttp', {
                message: "Notificação salva com sucesso!",
                httpStatus: responseRequest.status
            });
            return responseData;
        }).catch((err: any) => {
            throw new PersistNotificationException(err.response.data.message, err.response.status);
        });
    }

    public async republish(id: string): Promise<boolean> {
        const resource = "/" + id + "/republish";
        return await apiClient.patch(DEFAULT_URL + resource).then((responseRequest): boolean => {
            return responseRequest.data;
        }).catch((err: any) => {
            console.log(err)
            throw new RepublishNotificationException(err, err.response.status);
        });
    }

    public async update(notificationPersist: NotificationPersist, id: string): Promise<AxiosResponse<any>> {
        const resource = "/" + id;
        return await apiClient.put(DEFAULT_URL + resource, notificationPersist);
    }

    public async list(page: number = 1, limit: number = process.env.VUE_APP_PAGINATION_DEFAULT_LIMIT, description?: string): Promise<ListingNotificationResponse> {

        let queryParams: string = DEFAULT_URL + "?";

        queryParams += "page=" + page;
        queryParams += "&limit=" + limit;

        if (description !== undefined && description != "") {
            queryParams += "&description=" + description;
        }

        return await apiClient.get(queryParams).then((responseRequest): ListingNotificationResponse => {
            if (responseRequest.data.data.length == 0) {
                return ListingNotificationResponse.nullReponse();
            }

            const notificationsList = responseRequest.data.data.map(function (notificationData: never) {
                return Notification.fromApi(notificationData);
            });


            return new ListingNotificationResponse(notificationsList, new PaginationResponse(
                responseRequest.data.perPage,
                responseRequest.data.currentPage,
                responseRequest.data.total,
                responseRequest.data.path,
                (responseRequest.data.currentPage + 1),
                responseRequest.data.lastPage,
            ));

        }).catch((err: any) => {
            console.log(err)
            throw new ListNotificationsException(err, err.response.status);
        });
    }


}