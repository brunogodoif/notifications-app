<?php

namespace App\Providers;

use App\Packages\Clinics\Repositories\ClinicsRepository;
use App\Packages\Clinics\Repositories\Interfaces\ClinicsRepositoryInterface;
use App\Packages\Customers\Repositories\CustomersRepository;
use App\Packages\Customers\Repositories\EmailsRepository;
use App\Packages\Customers\Repositories\Interfaces\CustomersRepositoryInterface;
use App\Packages\Customers\Repositories\Interfaces\EmailsRepositoryInterface;
use App\Packages\Customers\Repositories\Interfaces\PhonesRepositoryInterface;
use App\Packages\Customers\Repositories\PhonesRepository;
use App\Packages\Exams\Repositories\ExamCategoryRepository;
use App\Packages\Exams\Repositories\ExamTypeRepository;
use App\Packages\Exams\Repositories\Interfaces\ExamCategoryRepositoryInterface;
use App\Packages\Exams\Repositories\Interfaces\ExamTypeRepositoryInterface;
use App\Packages\ExamsProfiles\Repositories\Interfaces\ProfileItemRepositoryInterface;
use App\Packages\ExamsProfiles\Repositories\Interfaces\ProfileRepositoryInterface;
use App\Packages\ExamsProfiles\Repositories\ProfileItemRepository;
use App\Packages\ExamsProfiles\Repositories\ProfileRepository;
use App\Packages\Orders\Repositories\Interfaces\OrdersItemRepositoryInterface;
use App\Packages\Orders\Repositories\Interfaces\OrdersRepositoryInterface;
use App\Packages\Orders\Repositories\Interfaces\OrdersSamplesRepositoryInterface;
use App\Packages\Orders\Repositories\OrdersItemRepository;
use App\Packages\Orders\Repositories\OrdersRepository;
use App\Packages\Orders\Repositories\OrdersSamplesRepository;
use App\Packages\Pets\Repositories\Interfaces\PetsRepositoryInterface;
use App\Packages\Pets\Repositories\PetsRepository;
use App\Packages\PetsCustomersRelationship\Repositories\Interfaces\PetsCustomersRelationshipRepositoryInterface;
use App\Packages\PetsCustomersRelationship\Repositories\PetsCustomersRelationshipRepository;
use App\Packages\Tutors\Repositories\Interfaces\TutorsRepositoryInterface;
use App\Packages\Tutors\Repositories\TutorsRepository;
use App\Packages\Users\Repositories\Interfaces\UserRepositoryInterface;
use App\Packages\Users\Repositories\UserRepository;
use App\Packages\Veterinarians\Repositories\Interfaces\VeterinariansRepositoryInterface;
use App\Packages\Veterinarians\Repositories\VeterinariansRepository;
use App\Repositories\Interfaces\NotificationRepositoryInterface;
use App\Repositories\NotificationRepository;
use Illuminate\Support\ServiceProvider;


class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(NotificationRepositoryInterface::class, NotificationRepository::class);
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
