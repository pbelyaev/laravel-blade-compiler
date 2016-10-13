"use strict";

const htmlparser    = require('htmlparser2'),
      fs            = require('fs'),
      path          = require('path');

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
                include: /\@include\(\s*[\'\"]([^\[\]\'\"]*)[\'\"]\s*(?:(?:.*[^\s\)])\s*)*\s*\)/gi,

				extends: /\@extends\((?:[\'\"])(.*)(?:[\'\"])\)/gi,

				yield: /\@yield\([\'\"]?([^\'\"]*)[\'\"]?\)/gi,
				stack: /\@stack\(\s*[\'\"]\s*([^\'\"]*)[\'\"]\)/gmi,

				oneLinePush: /\@push\([\'\"]([^\'\"]*)[\'\"]\s*\,\s*[\"\']?([^\'\"\)]*)[\'\"]?\s*\)/gi,
				multiLinePush: /\@push\(\s*[\'\"]\s*([^\'\"]*)[\'\"]\s*\)((?:(?!\@endpush|\@stop).*\s*)*)*(?:\@endpush|\@stop)/gi,

                oneLineSection: /\@section\([\'\"]([^\'\"]*)[\'\"]?\s*\,\s*[\'\"]?([^\"\'\)]*)[\'\"]?\)/gi,
				multiLineSection: /\@section\(\s*[\'\"]?([^\'\"]*)[\'\"]?\s*\)((?:(?!\@stop|\@endsection).*\s*)*)*(?:\@stop|\@endsection)/gi
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
        this.html = this._parse(this._getFileContent(this.options.path));
    }

    /**
     * @param content
     *
     * @private
     */
    _parse(content)
    {
        var sections = {},
			stacks = {};

        if (this.options.extends) {
            content =  content.replace(this.options.regex.extends, (match, value) => {
                let filePath = path.join(this.options.folder, value.replace(/\./gi, "/") + '.blade.php');

                return this._getFileContent(filePath);
            }).replace(this.options.regex.oneLineSection, (match, key, value) => {
                sections[key] = value;

                return "";
            }).replace(this.options.regex.multiLineSection, (match, key, value) => {
                sections[key] = value;

                return "";
            }).replace(this.options.regex.yield, (match, key) => {
                return typeof sections[key] == "undefined" ? "" : sections[key];
            });
        }
        content = content. replace(this.options.regex.include, (match, value) => {
            let filePath = path.join(this.options.folder, value.replace(/\./gi, "/") + '.blade.php'),
                html = this._getFileContent(filePath);

            return this._parse(html);
        }).replace(this.options.regex.oneLinePush, (match, key, value) => {
			if (stacks[key] == undefined) stacks[key] = [];

			stacks[key].push(value);

			return "";
		}).replace(this.options.regex.multiLinePush, (match, key, value) => {
			if (stacks[key] == undefined) stacks[key] = [];

			stacks[key].push(value);

			return "";
		}).replace(this.options.regex.stack, (match, key) => {
			if (stacks[key] != undefined) {
				let html = "";

				stacks[key].forEach((item) => {
					html += item;
				});

				return html;
			}

			return "";
		});

        return content;
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
