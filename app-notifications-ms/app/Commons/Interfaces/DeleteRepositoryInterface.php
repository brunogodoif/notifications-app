<?php

namespace App\Commons\Interfaces;


interface DeleteRepositoryInterface
{
    public function delete(int $id) : bool;

}
