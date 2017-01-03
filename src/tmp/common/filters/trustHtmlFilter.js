/**
 * @file 鹰眼平台angularjs 将字符串按html 代码标签展示过滤器
 * @author Yajiao Wang(wangyajiao@baidu.com).
 */
define(function (require) {
    var filter = function ($sce) {
        return function (input) {
            return input && $sce.trustAsHtml(input) || input;
        };
    };
    filter.$inject = ['$sce'];
    return {
        name: 'trustHtml',
        func: filter
    };
});
