angular.module('app.services', [])

    .constant('dataBaseUrl', 'data/')

    .provider("pedidoResource", PedidoResourceProvider)

    .config(['dataBaseUrl', 'pedidoResourceProvider', 'productoResourceProvider', function (dataBaseUrl, pedidoResourceProvider, productoResourceProvider) {
        pedidoResourceProvider.setBaseUrl(dataBaseUrl);
        productoResourceProvider.setBaseUrl(dataBaseUrl);
    }])


    .provider("productoResource", ProductoResourceProvider)

    /* DEFINICIÓN DE CLASES */
    .service('producto', function(){
        this.id = "",
        this.nombre = "",
        this.ingredientes = "",
        this.precio = 0;
    })

    .service('reserva', function(){
        this.dia_recogida = "",
        this.hora_recogida = ""
    })

    .service('pedido', ['reserva', function(reserva){
        this.codigo = "",
        this.fecha = "",
        this.reserva = reserva;
        this.productos = [];
        this.cantidad = this.productos.length;
    }])

;

function PedidoResource($http, baseUrl) {
    this.get = function (pedidoId) {
        return new Promise(function (resolve, reject) {
            $http.get(baseUrl + 'historial-pedidos.json')
                .then(function successCallback(response) {
                    resolve(response.data);
                }, function errorCallback(response) {
                    reject(response.data, response.status);
                })
        });
    };

    this.list = function(){
        return new Promise(function (resolve, reject) {
            $http.get(baseUrl+'historial-pedidos.json')
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




function ProductoResource($http, baseUrl) {
        this.get = function (productoId) {
            return new Promise(function (resolve, reject) {
                $http.get(baseUrl + 'productos.json')
                    .then(function successCallback(response) {
                        resolve(response.data);
                    }, function errorCallback(response) {
                        reject(response.data, response.status);
                    })
            });
        };

        this.list = function(tipo){
            return new Promise(function (resolve, reject) {
                $http.get(baseUrl+'productos.json')
                    .then(function successCallback(response) {
                        resolve(response.data);
                    }, function errorCallback(response) {
                        reject(response.data, response.status);
                    })
            });
        }
    }

function ProductoResourceProvider() {
    var _baseUrl;
    this.setBaseUrl = function (baseUrl) {
        _baseUrl = baseUrl;
    }
    this.$get = ['$http', function ($http) {
        return new ProductoResource($http, _baseUrl);
  }];
}


