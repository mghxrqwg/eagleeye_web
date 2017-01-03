/**
 * @file 控制鹰眼平台死链页面controller
 * @author Yajiao Wang(wangyajiao@baidu.com).
 */
define(function (require) {
    var angular = require('angular');
    var tpl = require('text!iframetpl/line.tpl.html');
    var trustUrl = require('common/filters/trustUrlFilter');
    return {
        controller: function ($scope, $http, $routeParams) {
            $scope.showxUrl = $routeParams.url + '#fullScreen=true';
            $scope.names = $routeParams.name ? $routeParams.name.split(',') : ['Iframe页面'];
        },
        tpl: tpl,
        directive: [],
        filter: [trustUrl]
    };
});
