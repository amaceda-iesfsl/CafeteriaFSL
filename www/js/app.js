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

            .state('pedidos-recientes', {
                url: '/pedidos/recientes',
                templateUrl: 'templates/pedidos-recientes.html'
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
            .state('bocadillos', {
                url: '/productos/bocadillos',
                templateUrl: 'templates/productos/bocadillos.html'
            })

            .state('bebidas', {
                url: '/productos/bebidas',
                params:{
                    type: 'bebidas',
                },
                templateUrl: 'templates/productos/list.html'
            })

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
            })

            // --------------- CARRITO

            .state('carrito', {
                url: '/pedido/carrito',
                templateUrl: 'templates/pedido/carrito.html'
            })

            .state('pedir', {
                url: '/pedido/reservar',
                templateUrl: 'templates/pedido/reservar.html',
                controller: 'OrderCtrl'
            })

            // --------------- PEDIDOS
            .state('detallePedido', {
                url: '/detalle-pedido',
                templateUrl: 'templates/detalle-pedido.html',
                controller: 'PedidoCtrl',
                resolve: {
                    pedido: ['pedidoResource',
                                function (pedidoResource) {
                            return pedidoResource.get('pedido');
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
              templateUrl: 'templates/admin/Pedido-pendientes.html'
            })
            .state('balance', {
              url: '/admin/balance',
              templateUrl: 'templates/admin/balance.html'
            })
            .state('pedido-recogidos', {
              url: '/admin/recogidos',
              templateUrl: 'templates/admin/pedido-recogidos.html'
            })
            .state('productos', {
              url: '/admin/productos',
              templateUrl: 'templates/admin/productos.html'
            });


       

        /*
        $routeProvider.when('/hipoteca/detalle/:idHipoteca', {
            templateUrl: "html/detalle.html",
            controller: "hipotecaController",
            resolve: {
                hipoteca: ['hipotecaResource', '$route',
                    function (hipotecaResource, $route) {
                        return hipotecaResource.get($route.current.params.idHipoteca);
                    }]
            }
        });

        $routeProvider.when('/hipoteca/listado', {
            templateUrl: "html/listado.html",
            controller: "listadoController",
            resolve: {
                hipotecas: ['hipotecaResource', function (hipotecaResource) {
                    return hipotecaResource.list();
                }]
            }
        });
        */
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

          .state('tab.chats', {
              url: '/chats',
              views: {
                'tab-chats': {
                  templateUrl: 'templates/tab-chats.html',
                  controller: 'ChatsCtrl'
                }
              }
            })
            .state('tab.chat-detail', {
              url: '/chats/:chatId',
              views: {
                'tab-chats': {
                  templateUrl: 'templates/chat-detail.html',
                  controller: 'ChatDetailCtrl'
                }
              }
            })

          .state('tab.account', {
            url: '/account',
            views: {
              'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'
              }
            }
          });*/



        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');

    });
