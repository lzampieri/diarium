To correct for a bug in inertia, one should modify the line 102 of the file vendor\inertiajs\inertia-laravel\src\Response.php to:

            'url' => $request->getRequestUri(),