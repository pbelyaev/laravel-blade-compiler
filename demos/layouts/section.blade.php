@yield('first')

@yield('second')

@yield('third')

@section('fourth', "<p>Fourth parent.</p>")

@section('fifth')
<p>Fifth parent.</p>
@endsection

@section('sixth')
<p>Sixth parent.</p>
@endsection

@yield('it-has-to-be-removed')