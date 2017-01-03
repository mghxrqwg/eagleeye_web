/**
 * @file 鹰眼平台angularjs line图表指令
 * @author Yajiao Wang(wangyajiao@baidu.com).
 */
define(function (require) {
    var angular = require('angular');
    var echarts = require('echarts');
    var macarons = require('libs/echarts-theme/macarons');

    //angular会自动根据controller函数的参数名，导入相应的服务
    return {
        name: 'myLine',
        func: function () {
            return {
                scope: {
                    id: '@',
                    legend: '=',
                    item: '=',
                    data: '=',
                    style: '@'
                },
                restrict: 'E',
                template: function (tElement, tAttr) {
                    // 添加样式
                    var style = tAttr['style'];
                    style = style ? style : 'height:240px;';
                    return '<div style="' + style + '"></div>';
                },
                replace: true,
                link: function ($scope, element, attrs, controller) {
                    $scope.$watch('data', function (newVal, oldVal) {
                        if (!newVal) {
                            return;
                        }
                        var option = {
                            // 提示框，鼠标悬浮交互时的信息提示
                            tooltip: {
                                show: true,
                                trigger: 'axis'
                            },
                            // 图例
                            legend: {
                                data: $scope.item,
                                y: 'bottom'
                            },
                            xAxis: [{
                                type: 'category',
                                boundaryGap : false,
                                data: newVal.day
                            }],
                            grid: {

                            },
                            // 纵轴坐标轴
                            yAxis: [{
                                type: 'value'
                            }],
                            series: function () {
                                var serie = [];
                                for (var i = 0; i < $scope.legend.length; i++) {
                                    var item = {
                                        name: $scope.item[i],
                                        type: 'line',
                                        data: newVal[$scope.legend[i]],
                                    };
                                    serie.push(item);
                                }
                                return serie;
                            }()
                        };
                        var myChart = echarts.init(document.getElementById($scope.id), macarons);
                        myChart.setOption(option);
                    });
                }
            };
        }
    };
});
