/**
 * @file 鹰眼平台angularjs 当ng-repeat执行完成后，再初始化select值。此directive比较特殊，其中涉及angular $digest循环与浏览器事件冲突，使用_.defer延迟调用
 * @author Yajiao Wang(wangyajiao@baidu.com).
 */
define(function (require) {
    require('css!common/select2/select2.css');
    require('css!common/select2/theme.css');
    require('common/select2/select2.min');
    var _ = require('underscore');
    return {
        name: 'select2',
        func: function () {
            return {
                scope: {
                },
                restrict: 'EA',
                require : '^ngModel',
                link: function ($scope, element, attrs, ctrl) {
                    if ($scope.$parent.$last) {
                        $scope.triggerChange = false;
                        $scope.option = $scope.option || {};
                        $scope.select = $(element).parent().select2($scope.option);
                        $scope.select.on('change', function (evt) {
                            if (evt.val) {
                                ctrl.$setViewValue(evt.val);
                            }
                        });
                        if (ctrl.$modelValue) {
                            $scope.select.val(ctrl.$modelValue);
                        }
                        ctrl.$render = function () {
                            if ($scope.select && !$scope.triggerChange) {
                                $scope.triggerChange = true;
                                // 延时发送select2事件，待$digest执行完成后再执行
                                _.defer(function () {$(element).val($scope.$modelValue).trigger('change')});
                            }
                        };
                    }
                }
            }
        }
    };
});

