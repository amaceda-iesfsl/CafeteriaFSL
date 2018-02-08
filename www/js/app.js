// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic', 'app.controllers', 'app.services'])
    .run(function ($ionicPlatform) {
        $ionicPlatform
            .ready(function () {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                    // for form inputs)
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                    // Don't remove this line unless you know what you are doing. It stops the viewport
                    // from snapping when text inputs are focused. Ionic handles this internally for
                    // a much nicer keyboard experience.
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }

            });
        // not working
        /*
            $ionicPlatform.onHardwareBackButton(function () {
                return false;
            })*/
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            /*
              .state('app', {
              url: '/',
              abstract: true,
              templateUrl: 'templates/app.html'
            })*/

            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html'
            })

            .state('home', {
                url: '/home',
                templateUrl: 'templates/home.html'
            })


            // --------------- USUARIO

            .state('perfil', {
                url: '/perfil',
                templateUrl: 'templates/perfil/mi-perfil.html'
            })

            .state('saldo', {
                url: '/perfil/saldo',
                templateUrl: 'templates/perfil/anyadir-saldo.html'
            })

            // --------------- PRODUCTOS
    /*
            .state('bocadillos', {
                url: '/productos/bocadillos',
                templateUrl: 'templates/productos/bocadillos.html'
            })*/

            .state('productos', {
                url: '/productos/:type',
                templateUrl: 'templates/productos/list.html',
                controller: 'ProductosCtrl',
                resolve: {
                    productos: ['productoResource', '$stateParams',
                                function (productoResource, $stateParams) {
                                    return productoResource.list();
                                }
                            ]
                }
            })
            /*
            .state('cafes', {
                url: '/productos/cafes',
                params:{
                    type: 'cafes',
                },
                templateUrl: 'templates/productos/list.html'
            })

            .state('bolleria', {
                url: '/productos/bolleria',
                params:{
                    type: 'bolleria',
                },
                templateUrl: 'templates/productos/list.html'
            })*/

            // --------------- CARRITO

            .state('carrito', {
                url: '/pedido/carrito',
                templateUrl: 'templates/pedido/carrito.html',
                controller: 'OrderCtrl'
            })

            .state('pedir', {
                url: '/pedido/reservar',
                templateUrl: 'templates/pedido/reservar.html',
                controller: 'OrderCtrl'
            })

            // --------------- PEDIDOS
            .state('detallePedido', {
                url: '/pedido/view/:pedidoId',
                templateUrl: 'templates/pedido/detalle-pedido.html',
                controller: 'PedidoCtrl',
                resolve: {
                    pedidos: ['pedidoResource', '$stateParams',
                                function (pedidoResource, $stateParams) {
                                    return pedidoResource.list();
                                }
                            ]
                }
            })
            .state('pedidos-recientes', {
                url: '/pedidos/recientes',
                templateUrl: 'templates/pedido/recientes.html',
                controller: 'PedidosRecientesCtrl',
                resolve: {
                    pedidos: ['pedidoResource',
                                function (pedidoResource) {
                                    return pedidoResource.list();
                                }
                            ]
                }
            })


            /* ============= ADMIN VIEWS =========== */
            .state('admin-home', {
                url: '/admin/home',
                templateUrl: 'templates/admin/home.html'})

            .state('nuevo-producto', {
                url: '/admin/nuevo-producto',
                templateUrl: 'templates/admin/nuevo-producto.html'
            })
            .state('nueva-oferta', {
              url: '/admin/nueva-oferta',
              templateUrl: 'templates/admin/Nueva-oferta.html'
            })
            .state('Pedido-pendientes', {
              url: '/admin/Pedido-pendientes',
              templateUrl: 'templates/admin/Pedido-pendientes.html',
              controller: "pedpendienteCtrl",
              resolve: {
                pendientes: ['PendienteResource',
                            function (PendienteResource) {
                                console.log("app.js"+PendienteResource.list());
                                return PendienteResource.list();
                            }
                        ]
            }
            })
            .state('balance', {
              url: '/admin/balance',
              templateUrl: 'templates/admin/balance.html'
            })
            .state('pedido-recogerPedidos', {
              url: '/admin/recogerPedidos',
              templateUrl: 'templates/admin/pedido-recogerPedido.html',
              controller: "lecturaCtrl",
              resolve: {
                pendientes: ['PendienteResource',
                            function (PendienteResource) {
                                console.log("app.js"+PendienteResource.list());
                                return PendienteResource.list();
                            }
                        ]
            }
            })
            .state('admin-productos', {
              url: '/admin/productos',
              templateUrl: 'templates/admin/productos.html'
            });

        /*
          // Each tab has its own nav history stack:

          .state('tab.dash', {
            url: '/dash',
            views: {
              'tab-dash': {
                templateUrl: 'templates/tab-dash.html',
                controller: 'DashCtrl'
              }
            }
          })


*/
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');

    });
