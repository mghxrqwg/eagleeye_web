/**
 * Created by kenkozheng on 2015/7/10.
 * 更适合团队配合的配置版router
 * 彻底解耦，按需加载，router的配置可以放到服务器直出，更便于团队合作
 */
define(['angular-route', 'routeResolver'], function () {
    var app = angular.module('webapp', [
        'routeResolverProvider', 'ngRoute'
    ]);

    app.config(['$routeProvider', 'routeResolverProvider', '$controllerProvider', 
                '$compileProvider', '$filterProvider', '$provide',
        function ($routeProvider, routeResolverProvider, $controllerProvider, 
                  $compileProvider, $filterProvider, $provide) {

            app.register = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };
            //Define routes - controllers will be loaded dynamically
            var route = routeResolverProvider.route;
            $routeProvider
                .when('/deadlink', route.resolve('deadlink', 'deadlink/'))
                .when('/show', route.resolve('show', 'show/'))
                .when('/show/:new', {templateUrl: 'show/line.html', controller: 'showController'})
                .when('/customerorders/:customerID', route.resolve('CustomerOrders'))
                .when('/orders', route.resolve('Orders'))
                .otherwise({ redirectTo: '/customers' });
        }
    ]);
    /*app.run(['$q', 'use$q', '$rootScope', '$location', 'authService',
    function ($q, use$q, $rootScope, $location, authService) {

        // other coding

        //Client-side security. Server-side framework MUST add it's 
        //own security as well since client-based security is easily hacked
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            if (next && next.$$route && next.$$route.secure) {
                if (!authService.user.isAuthenticated) {
                    authService.redirectToLogin();
                }
            }
        });

    }]);*/
    return app;
});
