angular.module('app.controllers', [])

    .controller('PedidoCtrl', ['$scope', 'pedido', function ($scope, pedido) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.pedido = pedido;
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
        /*
        $scope.doOrder = function () {
            $scope.modal.show();
        }*/

    }]);
