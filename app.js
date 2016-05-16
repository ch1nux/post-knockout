/* Model de entradas, donde se describen los datos a ser almacenados */
var Entrada = function () {
	var self = this; // [1]

	// Atributos del modelo
	self.precio = ko.observable();
	self.cantidad = ko.observable(1); // [2]
	self.vendida = ko.observable(false); // [3]

	self.subtotal = ko.pureComputed(function () { // [4]
		return (self.precio()) ? self.precio() * self.cantidad() : self.precio();
	});

}

// Formato al monto de entrada
function formato (monto) {
	return monto ? "Bs. " + monto : "";
}

/* ViewModel de Venta de Entradas, donde se declaran los enlaces */
var Venta = function () {
	var self = this;

	self.catalogo = ko.observableArray([ // [5]
		{ tipo: "Patio", precio: 250, cantidad: 50 },
		{ tipo: "Palco", precio: 450, cantidad: 30 },
		{ tipo: "VIP", precio: 650, cantidad: 20 }
	]);

	self.entradasVendidas = ko.observableArray([ // [6]
		new Entrada()
	]);

	self.agregarEntrada = function () {
		self.entradasVendidas.push(new Entrada());
	}

	self.cancelarEntrada = function () {
		if (self.entradasVendidas().length === 1) {
			alert("Debe venderse al menos una entrada");
		} else {
			self.entradasVendidas.remove(this); // [7]
		}
	}

	self.tipoEntrada = function (precio) {
		return parseInt(precio) === 450 ? 1 : parseInt(precio) === 650 ? 2 : 0;
	}
}

ko.applyBindings(new Venta()); // [8]