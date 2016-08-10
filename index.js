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
            regex: {
                include: /@include\(\s*[\'\"]([^\[\]\'\"]*)[\'\"]\s*(?:(?:.*[^\s\)])\s*)*\s*\)/gi,
                extends: /@extends\((?:[\'\"])(.*)(?:[\'\"])\)/gi,
                yield: /@yield\([\'\"]?([^\'\"]*)[\'\"]?\)/gi,
                multiLineSection: /@section\(\s*[\'\"]?([^\'\"]*)[\'\"]?\s*\)((?!\@stop).*\s*)*\@stop/gi,
                oneLineSection: /@section\([\'\"]([^\'\"]*)[\'\"]?\s*\,\s*[\'\"]?([^\"\']*)[\'\"]?\)/gi
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
        var items = {};

        return template.replace(this.options.regex.extends, (match, value) => {
            let filePath = path.join(this.options.folder, value.replace(/\./gi, "/") + '.blade.php');
            
            return this._getFileContent(filePath);
        }).replace(this.options.regex.oneLineSection, (match, key, value) => {
            items[key] = value;

            return "";
        }).replace(this.options.regex.multiLineSection, (match, key, value) => {
            items[key] = value;

            return "";
        }).replace(this.options.regex.yield, (match, key) => {
            return typeof items[key] == "undefined" ? "" : items[key];
        }).replace(this.options.regex.include, (match, value) => {
            let filePath = path.join(this.options.folder, value.replace(/\./gi, "/") + '.blade.php'),
                html = this._getFileContent(filePath);
            
            return this._parse(html);
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
