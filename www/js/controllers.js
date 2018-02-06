angular.module('app.controllers', [])

    .controller('PedidoCtrl', ['$scope', 'pedidos', '$stateParams', function ($scope, pedidos, $stateParams) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.pedido = findElement(pedidos, "codigo", $stateParams.pedidoId);
    }])

    .controller('PedidosRecientesCtrl', ['$scope', 'pedidos', function ($scope, pedidos) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.pedidos = pedidos;
    }])

    .controller('OrderCtrl', ['$scope', '$ionicModal', function ($scope, $ionicModal) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $ionicModal.fromTemplateUrl('templates/pedido/pedido-realizado.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.doOrder = function () {
            $scope.modal.show();
        }

        $scope.removeModal = function () {
            $scope.modal.hide();
        }

    }])
    .controller('ProductosCtrl', ['$scope', '$ionicModal', 'productos', '$stateParams', 'pedido', function ($scope, $ionicModal, productos, $stateParams, pedido) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.tipo = $stateParams.type;
        $scope.pedido = pedido;

        $scope.productos = productos[$scope.tipo];
        $ionicModal.fromTemplateUrl('templates/productos/info.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.viewProduct = function (prod) {
            $scope.prod = prod;
            $scope.modal.show();
        }

        $scope.hideModal = function () {
            $scope.modal.hide();
        }

        $scope.cart = {
            add: function (itemId) {
                var index = pedido.productos.indexOf(findElement($scope.productos, "id", itemId));
                if (index < 0) {
                    var producto = findElement($scope.productos, "id", itemId);
                    producto.cantidad = 1;
                    pedido.productos.push(producto);;
                } else {
                    if(pedido.productos[index].cantidad < 5){
                        pedido.productos[index].cantidad += 1;
                    }
                }
            },
            remove: function (itemId) {
                var index = pedido.productos.indexOf(findElement($scope.productos, "id", itemId));
                if (index >= 0) {
                    if (pedido.productos[index].cantidad == 0) {
                        pedido.productos[index] = null;
                    } else {
                        pedido.productos[index].cantidad -= 1;
                    }
                }
            }
        }
    }]);

function findElement(arr, propName, propValue) {
    for (var i = 0; i < arr.length; i++)
        if (arr[i][propName] == propValue)
            return arr[i];

    // will return undefined if not found; you could return a default instead
}
