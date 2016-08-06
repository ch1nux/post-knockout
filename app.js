// Formato al monto de entrada
function formato (monto) {
	return monto ? "Bs. " + monto : "";
}

/* Model de Entradas */
var Entrada = function () {
	var self = this; // [1]

	// Atributos del modelo
	self.nombre = ko.observable(""); // [2]
	self.precio = ko.observable();
	self.cantidad = ko.observable(1); // [3]
	self.vendida = ko.observable(false); // [4]

	self.subtotal = ko.pureComputed(function () { // [5]
		return (self.precio()) ? self.precio() * self.cantidad() : self.precio();
	});

}

/* ViewModel de Venta de Entradas */
var Venta = function () {
	var self = this;

	self.catalogo = ko.observableArray([
		{ tipo: "Patio", precio: 250, cantidad: 50 },
		{ tipo: "Palco", precio: 450, cantidad: 30 },
		{ tipo: "VIP", precio: 650, cantidad: 20 }
	]);

	self.ventaCerrada = ko.observable(false);

	self.entradasVendidas = ko.observableArray([ // [7]
		new Entrada()
	]);

	self.tipoEntrada = function (precio) {
		return parseInt(precio) === 450 ? 1 : parseInt(precio) === 650 ? 2 : 0;
	}

	var ultimaEntrada = function () {
		return self.entradasVendidas()[self.entradasVendidas().length - 1];
	}

	var totalVenta = function () {
		var total = 0, cantidadEntradas = 0;
		self.entradasVendidas().forEach(function (entrada) {
			total += entrada.subtotal();
			cantidadEntradas += parseInt(entrada.cantidad());
		});
		return {total: total, cantidadEntradas: cantidadEntradas};
	}

	self.comprar = function (entrada) {
		var id = entrada.precio() === 450 ? 1 : entrada.precio() === 650 ? 2 : 0;
		if (entrada.cantidad() > self.catalogo()[id].cantidad ) {
			return false;
		} else {
			self.catalogo()[id].cantidad -= parseInt(entrada.cantidad());
			if (self.catalogo()[id].cantidad == 0) {
				alert("Entradas " + self.catalogo()[id].tipo + " Agotadas!");
				self.catalogo().splice(id, 1);
			}
			return true;
		}
	};

	self.agregarEntrada = function () {
		if (!ultimaEntrada().vendida()) {
			alert("Por favor, confirme la venta de esta entrada");
		} else {
			if (!self.comprar(ultimaEntrada())) {
				alert("Quedan " + self.catalogo()[id].cantidad + " entrada(s) tipo " + self.catalogo()[id].tipo);
			} else {
				self.entradasVendidas.push(new Entrada());
			}
		}
	}

	self.cerrarVenta = function () {
		if (!ultimaEntrada().vendida()) {
			alert("Por favor, confirme la venta de esta entrada");
		} else {
			self.comprar(ultimaEntrada());
			self.ventaCerrada(true);
			var venta = totalVenta();
			console.info(venta.cantidadEntradas === 1 ? "Se vendió" : "Se vendieron", venta.cantidadEntradas, "entrada(s) con un total de Bs.", venta.total);
			console.info("Entradas restantes:");
			console.table(self.catalogo());
			var data = {}
			Object.keys(venta).forEach(function (clave) {
				data[clave] = venta[clave];
			});
			data["catalogo"] = self.catalogo();
			console.info("Los datos están listos para enviarse al servidor");
			console.log(ko.mapping.toJSON(data));
		}
	}
}

ko.applyBindings(new Venta());
