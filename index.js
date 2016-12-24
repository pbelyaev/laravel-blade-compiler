const fs    = require('fs'),
      path  = require('path');

class LaravelBladeParser
{
    /**
     * @param options
     */
    constructor(options)
    {
        this.html = "";
        this.defaultOptions = {
            folder: './resources/views',
            path: './resources/views/welcome.blade.php',
            extends: true,
            regex: {
                comments: /\{\{\-\-.*\-\-\}\}/gi,

                include: /\@include\(\s*[\'\"]([^\[\]\'\"]*)[\'\"]\s*(?:(?:.*[^\s\)])\s*)*\s*\)/gi,

				extends: /\@extends\((?:[\'\"])(.*)(?:[\'\"])\)/gi,

				yield: /\@yield\([\'\"]?([^\'\"]*)[\'\"]?\)/gi,
				stack: /\@stack\(\s*[\'\"](.*)[\'\"]\)/gi,

                push: /\@push\(\s*[\'\"]\s*(.*)[\'\"]\s*\)((?:(?!\@endpush|\@stop).*\s*)*)(?:\@endpush|\@stop)|\@push\([\'\"](.*)[\'\"]\s*\,\s*[\"|\'](.*)[\"|\']\s*\)/gi,

                section: /\@section\([\'\"](.*)[\'\"]\s*\,\s*[\'\"](.*)[\'\"]\)|\@section\(\s*[\'\"](.*)[\'\"]\s*\)((?:(?!\@show|\@stop|\@endsection).*\s*)*)(\@show|\@stop|\@endsection)/gi,
                showSection: /\@section\(\s*[\'\"](.*)[\'\"]\s*\)((?:(?!\@show).*\s*)*)(?:\@show)/gi,
            },
            encoding: 'utf8'
        };
        this.options = Object.assign(this.defaultOptions, options ? options : {});

        this._init();
    }

    /**
     * @returns {string|XML|string|void|*|*}
     */
    getHTML()
    {
        return this.html;
    }

    /**
     * @private
     */
    _init()
    {
        this.html = this._compile(this._getFileContent(this.options.path));
    }

    /**
     * @param content
     *
     * @private
     */
    _compile(content)
    {
        let sections = {},
			stacks = {};

        // remove comments
        content = content.replace(this.options.regex.comments, match => "");

        // @extends directive
        if (this.options.extends) {
            content = content.replace(this.options.regex.extends, (match, value) => {
                let filePath = path.join(this.options.folder, value.replace(/\./gi, "/") + '.blade.php');

                return this._getFileContent(filePath);
            });
        }

        // @include directive
        content = this._compileIncludes(content);

        // @section directive
        content = content.replace(this.options.regex.section, (match, firstKey, firstValue, secondKey, secondValue, type) => {
            let key = secondKey != undefined ? secondKey : firstKey,
                value = secondValue != undefined ? secondValue : firstValue;

            if (type == "@show") {
                sections[key] = sections[key] != undefined ? sections[key] : "";
                sections[key] = value.replace(/\@parent/gi, "");

                return `@yield('${key}')`;
            }

            if (value.match(/\@parent/g)) {
                sections[key] = sections[key] != undefined ? sections[key] : "";
                sections[key] += value.replace(/\@parent/gi, "");
            } else {
                sections[key] = value;
            }

            return "";
        });

        // @push directive
        content = content.replace(this.options.regex.push, (match, firstKey, firstValue, secondKey, secondValue) => {
            let key = secondKey != undefined ? secondKey : firstKey,
                value = secondValue != undefined ? secondValue : firstValue;

            if (stacks[key] == undefined) {
			    stacks[key] = [];
            }

			stacks[key].push(value);

			return "";
		});

        // @stack directive
        content = content.replace(this.options.regex.stack, (match, key) => {
			if (stacks[key] != undefined) {
				let html = "";

				stacks[key].forEach(item => html += item);

				return html;
			}

			return "";
		});

        // @yield directive
        content = content.replace(this.options.regex.yield, (match, key) => {
            return sections[key] == undefined ? "" : sections[key];
        });

        return content;
    }

    /**
     * @param html
     * @returns {XML|void|string|*}
     * @private
     */
    _compileIncludes(html)
    {
        return html.replace(this.options.regex.include, (match, value) => {
            let filePath = path.join(this.options.folder, value.replace(/\./gi, "/") + '.blade.php'),
                html = this._getFileContent(filePath);

            return this._compileIncludes(html);
        });
    }

    /**
     * @param filePath
     *
     * @returns {*}
     * @private
     */
    _getFileContent(filePath)
    {
        return fs.readFileSync(filePath, this.options.encoding);
    }
}

module.exports = options => new LaravelBladeParser(options).getHTML();