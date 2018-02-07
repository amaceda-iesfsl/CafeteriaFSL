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

    .controller('OrderCtrl', ['$scope', '$ionicPopup', '$ionicModal', 'pedido', function ($scope, $ionicPopup, $ionicModal, pedido) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.pedido = pedido;

        console.log($scope.pedido.productos);

        // A confirm dialog
        $scope.popConfirmar = function () {
            var myPopup = $ionicPopup.show({
                title: 'Advertencia',
                template: '<p style="text-align:justify">Comprueba que el pedido es correcto.<br><br> <p style="text-align:justify; color:red; font-weight:600">Una vez hecho, no se puede cancelar el pedido.</p></p>',
                buttons: [
                    { text: 'Cancelar',
                      type: "button-assertive"},
                    { text: "Confirmar pedido",
                        type: 'button-positive',
                        onTap: function (e) {
                            $scope.modal.show();
                        }}
                ]
            });
        };

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
    .controller('lecturaCtrl', ['$scope', '$ionicModal', function ($scope, $ionicModal) {
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
        $scope.productos = productos[$scope.tipo];
        $scope.pedido = pedido;

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

        console.log($scope.pedido);

        $scope.cart = {
            add: function (itemId) {
                    var index = pedido.productos.indexOf(findElement($scope.productos, "id", itemId));
                    var producto = findElement($scope.productos, "id", itemId);
                    if (!pedido.productos[itemId]) {
                        pedido.productos[producto.id] = producto;
                        pedido.productos[producto.id].cantidad = 1;
                        //pedido.productos.push(producto);
                    } else {
                        if (pedido.productos[itemId].cantidad < 5) {
                            pedido.productos[itemId].cantidad += 1;
                        }
                    }
            },
            remove: function (itemId) {
                if (pedido.productos[itemId]) {
                    if (pedido.productos[itemId].cantidad == 0) {
                        pedido.productos[itemId] = null;
                    } else {
                        pedido.productos[itemId].cantidad -= 1;
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
