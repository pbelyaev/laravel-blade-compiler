import test from 'ava'
import LaravelBladeParser from '../'

const HTML = LaravelBladeParser({
    folder: "demos",
    path: "demos/extends.blade.php",
    extends: false,
})

test("the output should contain the @extends directive", t => {
    t.is(HTML, "@extends('includes.message')")
})