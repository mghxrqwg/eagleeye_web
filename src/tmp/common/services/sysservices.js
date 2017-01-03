/**
 * @file 鹰眼平台angularjs 用于平台的一些用factory注册的公用服务
 * @author Yajiao Wang(wangyajiao@baidu.com).
 */
define(function (require) {
    return [{
        name: 'SDeliver',
        func: function () {
            var service = {};
            service.setDeliver = function (deliver, type) {
                service.deliver = deliver;
                service.type = type;
            }
            return service;
        }
    }];
});
