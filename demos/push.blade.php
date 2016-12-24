@extends('layouts.stack')

@push('content')
<p>Hello, world!</p>
@endpush

@push('content')
<p>Laravel Blade Parser works!</p>
@stop

@push('content', "<p>I don't know what else to say.</p>")