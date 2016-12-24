import test from 'ava'
import LaravelBladeParser from '../'

const HTML = LaravelBladeParser({
    folder: "demos",
    path: "demos/section.blade.php",
})

test("the output shouldn't contain the @section directives", t => {
    t.notRegex(HTML, /\@section/g)
})

test("the output should contain the content from extended file", t => {
    // There could be a lot of line breaks so remove them to be sure that the test will pass
    let html = HTML.replace(/\n/g, "")

    t.is(html, "<p>Hello, world!</p><p>Laravel Blade Parser works!</p><p>I don't know what else to say.</p><p>Fourth parent.</p><p>Hello, world!</p>")
})