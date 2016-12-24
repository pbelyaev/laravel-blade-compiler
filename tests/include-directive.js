import test from 'ava'
import LaravelBladeParser from '../'

const HTML = LaravelBladeParser({
    folder: "demos",
    path: "demos/include.blade.php",
})

test("the output shouldn't contain the @include directive", t => {
    t.notRegex(HTML, /\@include/g)
})

test("the output should contain the content from the included file", t => {
    t.is(HTML, "<p>Hello, world!</p>")
})