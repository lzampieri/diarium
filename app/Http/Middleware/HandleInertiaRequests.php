<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Auth;
use Tabuna\Breadcrumbs\Breadcrumbs;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request): array
    {
        $data = parent::share($request);

        if (session()->has('generalInfo')) {
            $data = array_merge($data, ['generalInfo' => session('generalInfo')]);
        }

        if (session()->has('snackbars')) {
            $data = array_merge($data, ['snackbars' => session('snackbars')]);
        }
        
        if( Auth::check() ) {
            $user = Auth::user()->load('workspaces');
            $data = array_merge($data, ['user' => $user]);

        }

        $data = array_merge($data, ['breadcrumbs' => $this->generateBreadcrumbs($request)]);

        return $data;
    }

    public function generateBreadcrumbs(Request $request)
    {
        if (!($route = $request->route()) instanceof Route) {
            return [];
        }

        if (!Breadcrumbs::has($route->getName())) {
            return [];
        }

        $breadcrumbs = Breadcrumbs::generate($route->getName(), $route->parameters());

        $collector = [];

        foreach ($breadcrumbs as $breadcrumb) {
            array_push($collector, [
                'title' => $breadcrumb->title(),
                'current' => $request->fullUrlIs($breadcrumb->url()),
                'url' => $breadcrumb->url(),
            ]);
        }

        return $collector;
    }
}
