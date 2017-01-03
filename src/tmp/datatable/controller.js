/**
 * @file 控制鹰眼平台死链页面controller
 * @author Yajiao Wang(wangyajiao@baidu.com).
 */
define(function (require) {
    var angular = require('angular');
    var tpl = require('text!datatable/line.tpl.html');
    var datatableDirective = require('common/myPageBarDirective');
    var datetimepickerDirective = require('common/datetimepickerDirective');
    var oneSelectSearchDirective = require('common/select2Directive');
    return {
        controller: function ($scope, $http, $q) {
            var promise = $http.get('/photoevaluate/getOsInfo?os=&type=2&date=20161218').success(function (data) {
                $scope.dp = data['data']['detail']['ios'];
            });
            console.log(promise);
            $scope.datetimeOption = {
                value: new Date(),
                format: 'Y-m-d H:i:s'
            };
            $scope.dateOption = {
                timepicker:false,
                value: new Date(),
                format: 'Y-m-d'
            };
            $scope.sort = function ($event, attr) {
                var th = angular.element($event.target).parents('th') || angular.element($event.target);
                var desc = th.hasClass('active');
                th.toggleClass('active');
                $scope.$broadcast('table:sort', {attr: attr, desc: !desc});
            };
            $scope.option2 = {
                tags: ['red', 'green', 'blue'],
                tokenSeparators: [',', ' ']
            };
            $scope.option1 = {};// 示例文档http://select2.github.io/examples.html
            $scope.select1 = [
                {
                    name: 'Alaskan/Hawaiian Time Zone',
                    items: [
                        {key: 'AK', value: 'Alaska'},
                        {key: 'HI', value: 'Hawaii'}
                    ]
                },
                {
                    name: 'Pacific Time Zone',
                    items: [
                        {key: 'CA', value: 'California'},
                        {key: 'NA', value: 'Nevada'},
                        {key: 'OG', value: 'Oregon'},
                        {key: 'WT', value: 'Washington'}
                    ]
                },
                {
                    name: 'Mountain Time Zone',
                    items: [
                        {key: 'CA', value: 'Arizona'},
                        {key: 'NA', value: 'Colorado'},
                        {key: 'IA', value: 'Idaho'},
                        {key: 'NK', value: 'Nebraska'},
                        {key: 'MT', value: 'Montana'},
                        {key: 'MN', value: 'Mea Nes'}
                    ]
                }
            ];
        },
        tpl: tpl,
        directive: [datatableDirective, datetimepickerDirective, oneSelectSearchDirective]
    };
});
