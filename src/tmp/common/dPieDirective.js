/**
 * @file 鹰眼平台angularjs 图表指令
 * @author QuXue(quxue@baidu.com).
 */
define(function (require) {
    var angular = require('angular');
    var echarts = require('echarts');
    var macarons = require('libs/echarts-theme/macarons');

    // angular会自动根据controller函数的参数名，导入相应的服务
    return {
        name: 'myDPie',
        func: function () {
            return {
                scope: {
                    id: '@',
                    data: '=',
                    style: '@'
                },
                restrict: 'E',
                template: function (tElement, tAttr) {
                    // 添加样式
                    var style = tAttr['style'];
                    style = style ? style : 'height:450px;';
                    return '<div style="' + style + '"></div>';
                },
                replace: true,
                link: function ($scope, element, attrs, controller) {
                    $scope.$watch('data', function (newVal, oldVal) {
                        if (!newVal) {
                            return;
                        }
                        var legend = [];
                        angular.forEach(newVal, function (item) {
                            legend.push(item.name);
                        });
                        var option = {
                            tooltip: {
                                show: true,
                                formatter: '{a} <br/>{b} : {c} ({d}%)'
                            },
                            toolbox: {
                                show: false
                            },
                            calculable: false,
                            series: [
                                {
                                    name: '操作系统',
                                    type: 'pie',
                                    radius: [0, '30%'],
                                    center: ['50%', '60%'],
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                position: 'inner',
                                                formatter: '{b}'
                                            },
                                            labelLine: {
                                                show: true
                                            }
                                        },
                                        emphasis: {
                                            label: {
                                                show: true,
                                                formatter: '{b}'
                                            }
                                        }
                                    },
                                    data: $scope.data[0]
                                },
                                {
                                    name: '插件版本',
                                    type: 'pie',
                                    center: ['50%', '60%'],
                                    radius: ['35%', '55%'],
                                    data: $scope.data[1]
                                }
                            ]
                        };
                        var myChart = echarts.init(document.getElementById($scope.id), macarons);
                        myChart.setOption(option);
                    });
                }
            };
        }
    };
});
