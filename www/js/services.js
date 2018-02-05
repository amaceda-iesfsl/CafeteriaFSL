angular.module('app.services', [])

    .constant('dataBaseUrl', 'data/')

    .provider("pedidoResource", PedidoResourceProvider)

    .config(['dataBaseUrl', 'pedidoResourceProvider', function (dataBaseUrl, pedidoResourceProvider) {
        pedidoResourceProvider.setBaseUrl(dataBaseUrl)
    }])
    .service('producto', function(){
            this.producto;
        })

    .service('reserva', function(){
        this.dia_recogida = "",
        this.hora_recogida = "",
        this.productos =  [];
        })

    .service('pedido', function(){
        this.codigo = "",
        this.fecha = "",
        this.dia_recogida = "",
        this.hora_recogida = "",
        this.productos = [];
    });

function PedidoResource($http, baseUrl) {
    this.get = function (tipo) {
        return new Promise(function (resolve, reject) {
            $http.get(baseUrl + tipo+ '.json')
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
