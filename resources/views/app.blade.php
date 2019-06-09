<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel Vue CRUD</title>
    <link rel="stylesheet" href="{{ asset('css/app.css')}}">
    </head>
    <body>
        <!-- Ejemplo axios -->
        <div class="container">
            @yield('content')
        </div>
        <!-- Fin Ejemplo axios -->
        <script src="{{ asset('js/app.js') }}" ></script>
    </body>
</html>
