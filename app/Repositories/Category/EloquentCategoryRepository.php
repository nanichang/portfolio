<?php

namespace App\Repositories\Category;
use App\Repositories\Category\CategoryContract;

class EloquentCategoryRepository implements CategoryContract
{

	//create a Post Category.
    public function create($request) {
			$category = new Category;
			$category->category_title = $request->title;
			$category->category_description = $request->description;        
			$str = strtolower($request->title);
			$category->category_slug = preg_replace('/\s+/', '-', $str);
			$category->save();
			return $category;
    }

    // return all Post Categories
    public function findAll() {
    	$categories = Category::all();
    	return $categories;
    }

    // return a Category by ID
    public function findById($id) {
      return Category::where('id', $id)->first();
    }

    public function findBySlug($category_slug){
			return Category::where('category_slug', $category_slug)->first();
		}

    // Update a Question
    public function update($request, $id) {
			$updateCategory = $this->findById($id);
      $updateCategory->category_title = $request->category_title;
      $updateCategory->category_description = $request->category_description;
      $updateCategory->save();
      return $updateCategory;
    }

    // Remove a Question
    public function remove($id) {
      $category= $this->findById($id);
      return $category->delete();
    }
}
