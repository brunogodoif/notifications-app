<?php

namespace App\Commons\Interfaces;


use Illuminate\Pagination\LengthAwarePaginator;

interface PaginateListingRepositoryInterface
{
    public function count(array $filters): int;

    public function paginate(array $filters, int $page = 1, int $limit = 2): LengthAwarePaginator;

}
