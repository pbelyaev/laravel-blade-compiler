import test from 'ava'
import LaravelBladeParser from '../'

const HTML = LaravelBladeParser({
    folder: "demos",
    path: "demos/comments.blade.php",
})

test("the output shouldn't contain any comments", t => {
    // There could be a lot of line breaks so remove them to be sure that the test will pass
    let html = HTML.replace(/\n/g, "");

    t.is(html, "<p>Hello, world!</p>")
})