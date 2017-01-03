/**
 * @file 鹰眼平台angularjs json转为html显示过滤器
 * @author Yajiao Wang(wangyajiao@baidu.com).
 */
define(function (require) {
    var syntaxHighlight = function (json) {
        if (typeof json !== 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
        return json.replace(
            /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    };
    var filter = function ($sce) {
        return function (input) {
            return input && '<pre>' + syntaxHighlight(input) + '</pre>' || input;
        };
    };
    filter.$inject = ['$sce'];
    return {
        name: 'jsonHtml',
        func: filter
    };
});
