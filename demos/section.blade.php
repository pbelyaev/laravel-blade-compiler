@extends('layouts.section')

@section('first')
<p>Hello, world!</p>
@endsection

@section('second', "<p>Laravel Blade Parser works!</p>")

@section('third')
<p>I don't know what else to say.</p>
@stop

@section('third')
@parent
<p>Hello, world! Again.</p>
@stop