<?php

namespace App\Http\Controllers\GeneratedControllers;

use App\Models\GeneratedModels\Track;

use Validator;
use Route;
use Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\GeneratedRequests\TrackRequest;

class TrackController extends \App\Http\Controllers\Controller
{
    private $fields = ["title" => ["required","min:2","max:100",], "artist" => ["required","min:2","max:150",], "track" => ["required","numeric",], "categories" => [], "genre" => [], "liked" => [], "skipped" => [], "played" => [], ];

    private $denied = [
            'success' => false,
            'errors' => ['access denied'],
            'test' => 'access-denied'
    ];

    /**
     * GET /track
     */
    public function index(Request $request)
    {
        $track = new Track();
        $query = $track->query();

        if (config('permissions.track') >= 3 && !$request->user()) {
            return response($this->denied, 200);
        }

        # At permission level 5, track is full private so only return rows for owner
        if (config('permissions.track') == 5) {
            $query = $query->where('user_id', $request->user()->id);
        }

        $results = $query->get();

        return response([
            'success' => true,
            'errors' => null,
            'track' => $results,
            'count' => $results->count()
        ], 200);
    }

    /**
    * GET /track/{id}
    */
    public function show(Request $request, $id)
    {
        $track = Track::where('id', $id)->first();

        if (!$track) {
            return response([
                'success' => false,
                'errors' => ['Track not found'],
                'test' => 'track-not-found'
            ], 200);
        }

        if (config('permissions.track') >= 3 && !$request->user()) {
            return response($this->denied, 200);
        }

        # At permission level 5, track is full private so only return rows for owner
        if (config('permissions.track') == 5 && $track->user_id != $request->user()->id) {
            return response($this->denied, 200);
        }

        return response([
            'success' => true,
            'errors' => null,
            'track' => $track->toArray()
        ], 200);
    }


    /**
    * GET /track/query?key=value
    */
    public function query(Request $request)
    {
        DB::enableQueryLog();

        $queries = $request->all();

        $track = new Track();

        $query = $track->query();

        if (config('permissions.track') >= 3 && !$request->user()) {
            return response($this->denied, 200);
        }
        
        # At permission_level 5, track is full private so user can only query for the tracks they own
        if (config('permissions.track') == 5) {
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
            'track' => $results
        ], 200);
    }

    /**
    * POST /track
    */
    public function store(TrackRequest $request)
    {
        $track = new Track();

        foreach ($this->fields as $fieldName => $rule) {
            $track->$fieldName = $request->$fieldName;
        }

        if (config('permissions.track') >= 1 && !($request->user())) {
            return response($this->denied, 200);
        }

        # At permission_level 5, track is full private so any new tracks has to belong to logged in user
        if (config('permissions.track') == 5) {
            $track->user_id = $request->user()->id;
        }
        
        $track->save();

        return response([
            'success' => true,
            'errors' => null,
            'test' => 'track-created',
            'track' => $track
            ], 200);
    }

    /**
    * DELETE /track/{id}
    */
    public function destroy(Request $request, $id)
    {
        $track = Track::find($id);

        if (!$track) {
            return response([
                'success' => false,
                'test' => 'track-not-found',
                'errors' => ['Track ' . $id . ' not found']
            ], 200);
        }

        if (config('permissions.track') >= 1 && !$request->user()) {
            return response($this->denied, 200);
        }

        # 2 - Track is readable by all, but only owners can alter
        # 4 - Track is only readable after login; only owner can alter
        # 5 - Track is only readable/alterable by owner
        if (in_array(config('permissions.track'), [2,4,5]) and $track->user_id != $request->user()->id) {
            return response($this->denied, 200);
        }

        $track->delete();

        return response([
            'success' => true,
            'errors' => null,
            'test' => 'track-deleted'
        ], 200);
    }

    /**
    * PUT /track/{id}
    */
    public function update(Request $request, $id)
    {
        $track = Track::find($id);

        if (!$track) {
            return response([
                'success' => false,
                'test' => 'update-failed-because-track-not-found',
                'errors' => ['Track ' . $id . ' not found']
            ], 200);
        }

        if (config('permissions.track') >= 1 && !$request->user()) {
            return response($this->denied, 200);
        }

        # 2 - Track is readable by all, but only owners can alter
        # 4 - Track is only readable after login; only owner can alter
        # 5 - Track is only readable/alterable by owner
        if (in_array(config('permissions.track'), [2,4,5]) and $track->user_id != $request->user()->id) {
            return response($this->denied, 200);
        }

        # Executing Form Request validation manually so we can do the check above
        # to make sure the track exists before validating
        # otherwise, it throws an error when checking unique fields
        app('App\Http\Requests\GeneratedRequests\TrackRequest');

        # Do update
        foreach ($this->fields as $fieldName => $rule) {
            $track->$fieldName = $request->$fieldName;
        }
        $track->save();

        return response([
            'success' => true,
            'errors' => null,
            'test' => 'track-updated',
            'message' => 'Updated track ' . $id,
            'track' => $track->toArray()
        ], 200);
    }
}