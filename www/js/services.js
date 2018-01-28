angular.module('app.services', [])

    .constant('dataBaseUrl', 'data/')

    .provider("pedidoResource", PedidoResourceProvider)

    .config(['dataBaseUrl', 'pedidoResourceProvider', function (dataBaseUrl, pedidoResourceProvider) {
        pedidoResourceProvider.setBaseUrl(dataBaseUrl);
}]);

function PedidoResource($http, baseUrl) {
    this.get = function () {
        return new Promise(function (resolve, reject) {
            $http.get(baseUrl + 'data.json')
                .then(function successCallback(response) {
                    resolve(response.data);
                }, function errorCallback(response) {
                    reject(response.data, response.status);
                })
        });
    }
}


function PedidoResourceProvider() {
    var _baseUrl;
    this.setBaseUrl = function (baseUrl) {
        _baseUrl = baseUrl;
    }
    this.$get = ['$http', function ($http) {
        return new PedidoResource($http, _baseUrl);
  }];
}
