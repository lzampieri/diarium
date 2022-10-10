<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <link href="{{ mix('/css/app.css') }}" rel="stylesheet" />
        <script src="{{ mix('/js/app.js') }}" defer></script>
        @inertiaHead
        @routes
    </head>
    <body class="bg-grey">
        <div class="w-full md:w-1/2 mx-auto my-4 p-8 bg-white min-h-screen border border-black shadow-2xl rounded-lg">
            @inertia
        </div>
    </body>
</html>
