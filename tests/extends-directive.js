import test from 'ava'
import LaravelBladeParser from '../'

const HTML = LaravelBladeParser({
    folder: "demos",
    path: "demos/extends.blade.php",
})

test("the output shouldn't contain the @extends directive", t => {
    t.notRegex(HTML, /\@extends/g)
})

test("the output should contain the content from extended file", t => {
    t.is(HTML, "<p>Hello, world!</p>")
})