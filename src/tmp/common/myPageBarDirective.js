/**
 * @file 鹰眼平台angularjs 远程及本地颁布表格指令
 * @author Yajiao Wang(wangyajiao@baidu.com).
 */
define(function (require) {
    var angular = require('angular');
    var tpl = require('text!common/tpl/pagebar.tpl.html');

    return {
        name: 'myPageBar',
        func: function () {
            return {
                scope: {
                    id: '@',
                    data: '=',
                    isRemotePage: '@',
                    pageData: '=',
                    pageSize: '@'
                },
                restrict: 'EA',
                template: tpl,
                link: function ($scope, element, attrs, controller) {
                    var getPageSize = function () {
                        return $scope.pageSize ? $scope.pageSize : '10';
                    };
                    $scope.pageSize = getPageSize();
                    if (!$scope.isRemotePage || $scope.isRemotePage === 'false') {
                        $scope.pageObj = {
                            'totalPage': 10,
                            'currentPage': 1,
                            'pageSize': $scope.pageSize
                        };
                    }
                    $scope.pageChange = function (flag) {
                        switch (flag) {
                            case 'first':
                                $scope.pageObj.currentPage = 1;
                                break;
                            case 'next':
                                $scope.pageObj.currentPage += 1;
                                break;
                            case 'prev':
                                $scope.pageObj.currentPage -= 1;
                                break;
                            case 'last':
                                $scope.pageObj.currentPage = $scope.pageObj.totalPage;
                                break;
                            case 'sizeChange':
                                $scope.pageObj.totalPage = Math.ceil($scope.data.length / $scope.pageSize);
                                $scope.pageObj.currentPage = 1;
                                break;
                        }
                        if ($scope.pageObj.currentPage <= 1) {
                            $scope.pageObj.currentPage = 1;
                        } else if ($scope.pageObj.currentPage >= $scope.pageObj.totalPage) {
                            $scope.pageObj.currentPage = $scope.pageObj.totalPage;
                        }
                        if (!$scope.isRemotePage || $scope.isRemotePage === 'false') {
                            var pageIdx = $scope.pageObj.currentPage - 1;
                            var start = pageIdx * $scope.pageSize;
                            var end = start + parseInt($scope.pageSize, 10);
                            $scope.pageData = $scope.data.slice(start, end);
                        }
                    };
                    $scope.$watch('data', function (newVal, oldVal) {
                        if (newVal) {
                            $scope.pageSize = getPageSize();
                            if (!$scope.isRemotePage || $scope.isRemotePage === 'false') {
                                $scope.pageObj.totalPage = Math.ceil(newVal.length / $scope.pageSize);
                            }
                            $scope.pageChange('first');
                        }
                    });
                }
            };
        }
    };
});
