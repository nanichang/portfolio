<?php

namespace App\Repositories\Category;

interface CategoryContract {
	public function create($request);
	public function findAll();
	public function findById($id);
	public function update($request, $id);
	public function remove($id);
}
