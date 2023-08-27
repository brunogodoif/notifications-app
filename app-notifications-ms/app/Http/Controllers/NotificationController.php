<?php

namespace App\Http\Controllers;

use App\Commons\Traits\CamelAndSnakeConverter;
use App\Exceptions\NotificationResourceNotFoundException;
use App\Exceptions\ParameterNotFoundException;
use App\Http\Requests\DeactivateNotificationRequest;
use App\Http\Requests\StoreNotificationRequest;
use App\Http\Requests\UpdateNotificationRequest;
use App\Repositories\Interfaces\NotificationRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * @OA\Info(
 *     title="Notifications API",
 *     description="",
 *     version="1.0.0"
 * )
 */
class NotificationController extends Controller
{

    private NotificationRepositoryInterface $notificationRepository;

    public function __construct(NotificationRepositoryInterface $notificationRepository)
    {
        $this->notificationRepository = $notificationRepository;
    }

    /**
     * @OA\Get(
     *      path="/api/notifications",
     *      summary="List notifications with pagination",
     *      tags={"Notifications"},
     *      @OA\Parameter(name="page", in="query", description="Page number", @OA\Schema(type="integer", default=1)),
     *      @OA\Parameter(name="limit", in="query", description="Items per page", @OA\Schema(type="integer", default=15)),
     *      @OA\Parameter(name="description", in="query", description="description of notification", @OA\Schema(type="string")),
     *      @OA\Response(response=200, description="Successful operation"),
     *      security={{"sanctum": {}}}
     * )
     */
    public function index(Request $request): JsonResponse
    {
        $filters = ["description" => $request->get('description') ?? null];
        $responsePaginate = $this->notificationRepository->paginate(
            $filters,
            $request->page ?? 0,
            $request->limit ?? 15);

        $responsePaginate = CamelAndSnakeConverter::toCamelCase($responsePaginate->toArray());

        return response()->json(
            $responsePaginate,
            Response::HTTP_OK
        );
    }

    /**
     * @OA\Get(
     *      path="/api/notifications/{id}",
     *      summary="Show a notification",
     *      tags={"Notifications"},
     *      @OA\Parameter(name="id", in="path", description="Notification ID", required=true, @OA\Schema(type="integer")),
     *      @OA\Response(response=200, description="Successful operation"),
     *      @OA\Response(response=404, description="Notification not found"),
     *      security={{"sanctum": {}}}
     * )
     */
    public function show(Request $request): JsonResponse
    {
        $this->validateIdRouteRequest($request);
        $this->resourceExists($request->route('id'));

        $notification = $this->notificationRepository->getById($request->route('id'));
        return response()->json(
            CamelAndSnakeConverter::toCamelCase($notification->toArray()),
            Response::HTTP_OK
        );
    }


    /**
     * @OA\Post(
     *      path="/api/notifications",
     *      summary="Create a new notification",
     *      tags={"Notifications"},
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/StoreNotificationRequest")
     *      ),
     *      @OA\Response(response=201, description="Notification created successfully"),
     *      @OA\Response(response=400, description="Bad request"),
     *      security={{"sanctum": {}}}
     * )
     */
    public function store(StoreNotificationRequest $request): JsonResponse
    {
        $notificationStoreResponse = $this->notificationRepository->create(
            $request->validated()
        );

        return response()->json(
            $notificationStoreResponse,
            Response::HTTP_CREATED
        );
    }

    /**
     * @OA\Put(
     *      path="/api/notifications/{id}",
     *      summary="Update a notification",
     *      tags={"Notifications"},
     *      @OA\Parameter(name="id", in="path", description="Notification ID", required=true, @OA\Schema(type="integer")),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/UpdateNotificationRequest")
     *      ),
     *      @OA\Response(response=200, description="Notification updated successfully"),
     *      @OA\Response(response=400, description="Bad request"),
     *      @OA\Response(response=404, description="Notification not found"),
     *      security={{"sanctum": {}}}
     * )
     */
    public function update(UpdateNotificationRequest $request): JsonResponse
    {
        $this->validateIdRouteRequest($request);
        $this->resourceExists($request->route('id'));

        $notificationUpdateResponse = $this->notificationRepository->update(
            $request->route('id'),
            $request->validated()
        );

        return response()->json(
            $notificationUpdateResponse,
            Response::HTTP_OK
        );
    }

    /**
     * @OA\Delete(
     *      path="/api/notifications/{id}",
     *      summary="Delete a notification",
     *      tags={"Notifications"},
     *      @OA\Parameter(name="id", in="path", description="Notification ID", required=true, @OA\Schema(type="integer")),
     *      @OA\Response(response=200, description="Notification deleted successfully"),
     *      @OA\Response(response=404, description="Notification not found"),
     *      security={{"sanctum": {}}}
     * )
     */
    public function destroy(Request $request): JsonResponse
    {
        $this->validateIdRouteRequest($request);
        $this->resourceExists($request->route('id'));

        $notificationDeletedResponse = $this->notificationRepository->delete($request->route('id'));
        return response()->json(
            $notificationDeletedResponse
        );
    }

    /**
     * @OA\Patch(
     *      path="/api/notifications/{id}/activate",
     *      summary="Activate a notification",
     *      tags={"Notifications"},
     *      @OA\Parameter(name="id", in="path", description="Notification ID", required=true, @OA\Schema(type="integer")),
     *      @OA\Response(response=200, description="Successful operation"),
     *      @OA\Response(response=404, description="Notification not found"),
     *      security={{"sanctum": {}}}
     * )
     */
    public function activate(Request $request): JsonResponse
    {
        $this->validateIdRouteRequest($request);
        $this->resourceExists($request->route('id'));

        $notificationUpdateResponse = $this->notificationRepository->activate(
            $request->route('id'),
        );

        return response()->json(
            $notificationUpdateResponse,
            Response::HTTP_OK
        );
    }

    /**
     * @OA\Patch(
     *      path="/api/notifications/{id}/deactivate",
     *      summary="Deactivate a notification",
     *      tags={"Notifications"},
     *      @OA\Parameter(name="id", in="path", description="Notification ID", required=true, @OA\Schema(type="integer")),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/DeactivateNotificationRequest")
     *      ),
     *      @OA\Response(response=200, description="Successful operation"),
     *      @OA\Response(response=400, description="Bad request"),
     *      @OA\Response(response=404, description="Notification not found"),
     *      security={{"sanctum": {}}}
     * )
     */
    public function deactivate(DeactivateNotificationRequest $request): JsonResponse
    {
        $this->validateIdRouteRequest($request);
        $this->resourceExists($request->route('id'));

        $notificationUpdateResponse = $this->notificationRepository->deactivate(
            $request->route('id'),
            $request->validated()
        );

        return response()->json(
            $notificationUpdateResponse,
            Response::HTTP_OK
        );
    }

    /**
     * @OA\Patch(
     *      path="/api/notifications/{id}/republish",
     *      summary="Republish a notification",
     *      tags={"Notifications"},
     *      @OA\Parameter(name="id", in="path", description="Notification ID", required=true, @OA\Schema(type="integer")),
     *      @OA\Response(response=200, description="Successful operation"),
     *      @OA\Response(response=404, description="Notification not found"),
     *      security={{"sanctum": {}}}
     * )
     */
    public function republish(Request $request): JsonResponse
    {
        $this->validateIdRouteRequest($request);
        $this->resourceExists($request->route('id'));

        $notificationUpdateResponse = $this->notificationRepository->republish(
            $request->route('id'),
        );

        return response()->json(
            $notificationUpdateResponse,
            Response::HTTP_OK
        );
    }

    public function validateIdRouteRequest(Request $request): void
    {
        if (!$request->route()->hasParameter('id')) {
            throw new ParameterNotFoundException("Parameter [id] not found in request");
        }
    }

    public function resourceExists(int $id): bool
    {
        $notification = $this->notificationRepository->getById($id);
        if ($notification == null) {
            throw new NotificationResourceNotFoundException("Notification with id [" . $id . "]  not found in request");
        }
        return true;
    }
}
