angular.module('app.services', [])

    .constant('dataBaseUrl', 'data/')

    .provider("pedidoResource", PedidoResourceProvider)

    .config(['dataBaseUrl', 'pedidoResourceProvider', 'productoResourceProvider', function (dataBaseUrl, pedidoResourceProvider, productoResourceProvider) {
        pedidoResourceProvider.setBaseUrl(dataBaseUrl);
        productoResourceProvider.setBaseUrl(dataBaseUrl);
  }])

  .provider("PendientesResource", PendientesResourceProvider)

  .config(['dataBaseUrl', 'PendientesResourceProvider', function (dataBaseUrl, PendientesResourceProvider) {
    PendientesResourceProvider.setBaseUrl(dataBaseUrl);
    //productoResourceProvider.setBaseUrl(dataBaseUrl);
  }])


    .provider("productoResource", ProductoResourceProvider)

    /* DEFINICIÓN DE CLASES */
    .service('producto', function () {
        this.id = "";
        this.nombre = "";
        this.img = "";
        this.ingredientes = "";
        this.precio = 0;
        this.cantidad = 0;
    })

    .service('reserva', function () {
        this.dia_recogida = "";
        this.hora_recogida = "";
    })

    .service('usuario', function () {
        this.saldo = 10.00;
    })

    .service('pedido', ['reserva', 'cantidadTotal','precioTotal',  function (reserva, cantidadTotal, precioTotal) {
        this.codigo = "000052";
        this.fecha = "";
        this.reserva = reserva;
        this.productos = [];
        this.cTotal = cantidadTotal;
        this.pTotal = precioTotal;
    }])
    .service('pendiente ', function () {
        this.codigo = "",
        this.info = "",
        this.fecha = "",
        this.estado = "" 
        
    })

    .value('cantidadTotal', function () {
        var total = 0;
        for (var i = 0; i < this.productos.length; i++) {
            total += this.productos[i].cantidad;
        }
        return total;
    })
    .value('precioTotal', function () {
        var total = 0;
        for (var i = 0; i < this.productos.length; i++) {
            total += this.productos[i].precio;
        }
        return total;
    })
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

    this.list = function () {
        return new Promise(function (resolve, reject) {
            $http.get(baseUrl + 'historial-pedidos.json')
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

    this.list = function (tipo) {
        return new Promise(function (resolve, reject) {
            $http.get(baseUrl + 'productos.json')
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

//-----------------------------pedido-pendiente-------------------------------------------//
function PendientesResource($http, baseUrl) {
  this.get = function (pendienteId) {
    return new Promise(function (resolve, reject) {
      $http.get(baseUrl + 'pedido-pendiente.json')
        .then(function successCallback(response) {
          resolve(response.data);
        }, function errorCallback(response) {
          reject(response.data, response.status);
        })
    });
  };

  this.list = function () {
    return new Promise(function (resolve, reject) {
      $http.get(baseUrl + 'pedido-pendiente.json')
        .then(function successCallback(response) {
          resolve(response.data);
        }, function errorCallback(response) {
          reject(response.data, response.status);
        })
    });
  }
}

function PendientesResourceProvider() {
  var _baseUrl;
  this.setBaseUrl = function (baseUrl) {
    _baseUrl = baseUrl;
  }
  this.$get = ['$http', function ($http) {
    return new PendienteResource($http, _baseUrl);
  }];
}


