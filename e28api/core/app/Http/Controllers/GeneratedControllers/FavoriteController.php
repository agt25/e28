<?php

namespace App\Http\Controllers\GeneratedControllers;

use App\Models\GeneratedModels\Favorite;

use Validator;
use Route;
use Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\GeneratedRequests\FavoriteRequest;

class FavoriteController extends \App\Http\Controllers\Controller
{
    private $fields = ["track_id" => ["required","numeric",], "user_id" => ["required","numeric",], ];

    private $denied = [
            'success' => false,
            'errors' => ['access denied'],
            'test' => 'access-denied'
    ];

    /**
     * GET /favorite
     */
    public function index(Request $request)
    {
        $favorite = new Favorite();
        $query = $favorite->query();

        if (config('permissions.favorite') >= 3 && !$request->user()) {
            return response($this->denied, 200);
        }

        # At permission level 5, favorite is full private so only return rows for owner
        if (config('permissions.favorite') == 5) {
            $query = $query->where('user_id', $request->user()->id);
        }

        $results = $query->get();

        return response([
            'success' => true,
            'errors' => null,
            'favorite' => $results,
            'count' => $results->count()
        ], 200);
    }

    /**
    * GET /favorite/{id}
    */
    public function show(Request $request, $id)
    {
        $favorite = Favorite::where('id', $id)->first();

        if (!$favorite) {
            return response([
                'success' => false,
                'errors' => ['Favorite not found'],
                'test' => 'favorite-not-found'
            ], 200);
        }

        if (config('permissions.favorite') >= 3 && !$request->user()) {
            return response($this->denied, 200);
        }

        # At permission level 5, favorite is full private so only return rows for owner
        if (config('permissions.favorite') == 5 && $favorite->user_id != $request->user()->id) {
            return response($this->denied, 200);
        }

        return response([
            'success' => true,
            'errors' => null,
            'favorite' => $favorite->toArray()
        ], 200);
    }


    /**
    * GET /favorite/query?key=value
    */
    public function query(Request $request)
    {
        DB::enableQueryLog();

        $queries = $request->all();

        $favorite = new Favorite();

        $query = $favorite->query();

        if (config('permissions.favorite') >= 3 && !$request->user()) {
            return response($this->denied, 200);
        }
        
        # At permission_level 5, favorite is full private so user can only query for the favorites they own
        if (config('permissions.favorite') == 5) {
            $query = $query->where('user_id', $request->user()->id);
        }

        foreach ($queries as $key => $value) {
            $query = $query->where($key, $value);
        }

        $results = $query->get()->toArray();

        $query = DB::getQueryLog();

        return response([
            'success' => true,
            'errors' => [],
            'favorite' => $results
        ], 200);
    }

    /**
    * POST /favorite
    */
    public function store(FavoriteRequest $request)
    {
        $favorite = new Favorite();

        foreach ($this->fields as $fieldName => $rule) {
            $favorite->$fieldName = $request->$fieldName;
        }

        if (config('permissions.favorite') >= 1 && !($request->user())) {
            return response($this->denied, 200);
        }

        # At permission_level 5, favorite is full private so any new favorites has to belong to logged in user
        if (config('permissions.favorite') == 5) {
            $favorite->user_id = $request->user()->id;
        }
        
        $favorite->save();

        return response([
            'success' => true,
            'errors' => null,
            'test' => 'favorite-created',
            'favorite' => $favorite
            ], 200);
    }

    /**
    * DELETE /favorite/{id}
    */
    public function destroy(Request $request, $id)
    {
        $favorite = Favorite::find($id);

        if (!$favorite) {
            return response([
                'success' => false,
                'test' => 'favorite-not-found',
                'errors' => ['Favorite ' . $id . ' not found']
            ], 200);
        }

        if (config('permissions.favorite') >= 1 && !$request->user()) {
            return response($this->denied, 200);
        }

        # 2 - Favorite is readable by all, but only owners can alter
        # 4 - Favorite is only readable after login; only owner can alter
        # 5 - Favorite is only readable/alterable by owner
        if (in_array(config('permissions.favorite'), [2,4,5]) and $favorite->user_id != $request->user()->id) {
            return response($this->denied, 200);
        }

        $favorite->delete();

        return response([
            'success' => true,
            'errors' => null,
            'test' => 'favorite-deleted'
        ], 200);
    }

    /**
    * PUT /favorite/{id}
    */
    public function update(Request $request, $id)
    {
        $favorite = Favorite::find($id);

        if (!$favorite) {
            return response([
                'success' => false,
                'test' => 'update-failed-because-favorite-not-found',
                'errors' => ['Favorite ' . $id . ' not found']
            ], 200);
        }

        if (config('permissions.favorite') >= 1 && !$request->user()) {
            return response($this->denied, 200);
        }

        # 2 - Favorite is readable by all, but only owners can alter
        # 4 - Favorite is only readable after login; only owner can alter
        # 5 - Favorite is only readable/alterable by owner
        if (in_array(config('permissions.favorite'), [2,4,5]) and $favorite->user_id != $request->user()->id) {
            return response($this->denied, 200);
        }

        # Executing Form Request validation manually so we can do the check above
        # to make sure the favorite exists before validating
        # otherwise, it throws an error when checking unique fields
        app('App\Http\Requests\GeneratedRequests\FavoriteRequest');

        # Do update
        foreach ($this->fields as $fieldName => $rule) {
            $favorite->$fieldName = $request->$fieldName;
        }
        $favorite->save();

        return response([
            'success' => true,
            'errors' => null,
            'test' => 'favorite-updated',
            'message' => 'Updated favorite ' . $id,
            'favorite' => $favorite->toArray()
        ], 200);
    }
}