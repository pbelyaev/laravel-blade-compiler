import test from 'ava'
import LaravelBladeParser from '../'

const HTML = LaravelBladeParser({
    folder: "demos",
    path: "demos/push.blade.php",
})

test("the output shouldn't contain the @push directives", t => {
    t.notRegex(HTML, /\@push/g)
})

test("the output should contain the content from @push directives", t => {
    // There could be a lot of line breaks so remove them to be sure that the test will pass
    let html = HTML.replace(/\n/g, "");

    t.is(html, "<p>Hello, world!</p><p>Laravel Blade Parser works!</p><p>I don't know what else to say.</p>")
})