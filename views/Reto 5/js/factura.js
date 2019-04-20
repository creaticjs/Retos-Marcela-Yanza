Vue.filter('toCurrency', function (value) {
    if (typeof value !== "number") {
        return value;
    }
    var formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    });
    return formatter.format(value);
});


Vue.component('componente-item', 
{
    props: ['producto'],
    data: function() 
    {
      return {
        disabled: false
      };
    },
    methods: 
    {
    },
    computed: 
    {
	  	isDisabled: function()
	  	{
	  		var producto = this.$props.producto;
	  		if(!this.disabled)
	  			producto.cantidad = 0;
	    	return !this.disabled;
	    }
	},
    template:  
    `<tr>
        <th scope="row">
        	<div class="form-check text-center">
				<input class="form-check-input position-static" 
				type="checkbox"
				class=""
				v-on:change="app.moverProducto($event, producto)"
				@click="disabled = !disabled">
			</div>
        </th>
        <td class="text-center" v-model="producto.ref">
        	{{producto.ref}}
        </td>
        <td class="text-justify" v-model="producto.detalle">
        	{{producto.detalle}}
        </td>
        <td class="text-center" v-model="producto.precio">
        	{{producto.precio | toCurrency}}
        </td>
        <td class="text-center">
        	<input type="number" min="0" max="200" step="1" 
        		style="width: 55px;" v-model="producto.cantidad" :disabled="isDisabled">
        	</input>        	
        </td>										      
    </tr>`
});


Vue.component('componente-seleccionado', 
{
    props: ['producto'],
    data: function() 
    {
      return {
        
      };
    },
    methods: 
    {
      
    },
    template:  
    `<tr>        
        <th scope="row">
        	<div class="text-center" v-model="producto.ref">
        		{{producto.ref}}
        	</div>
        </th>
        <td class="text-justify text-center" v-model="producto.detalle">
        	{{producto.detalle}}
        </td>
        <td class="text-center" v-model="producto.precio">
        	{{producto.precio | toCurrency}}
        </td>
        <td class="text-center">
        	{{producto.cantidad}}        	
        </td>
        <td class="subtotal text-center" v-model="producto.total">
        	{{producto.total | toCurrency}}
        </td>
    </tr>`
});

var app = new Vue(
{
	el: "#app",
	data:
	{
		productos: 
		[
			{
				ref: "034-411A", 
				detalle: "Pasta en conchitas Doria 250 g.", 
				precio: 1150, 
				cantidad: 0,
				get total() {
					return this.cantidad*this.precio;
				}
			}, 
			{
				ref: "045-455A", 
				detalle: "Cereal desayuno Zucaritas 420 g.", 
				precio: 8790, 
				cantidad: 0,
				get total() {
					return this.cantidad*this.precio;
				}
			}, 
			{
				ref: "011-786A", 
				detalle: "Fríjol rojo 1K", 
				precio: 6750, 
				cantidad: 0,
				get total() {
					return this.cantidad*this.precio;
				}
			},
			{
				ref: "022-789A", 
				detalle: "Duraznos en almíbar 822 g. neto", 
				precio: 6290, 
				cantidad: 0,
				get total() {
					return this.cantidad*this.precio;
				}
			},
			{
				ref: "067-098A", 
				detalle: "Mantequilla con sal Alpina 250 g.", 
				precio: 2690, 
				cantidad: 0,
				get total() {
					return this.cantidad*this.precio;
				}
			},
			{
				ref: "045-876A", 
				detalle: "Chocolate Sol 1 lb.", 
				precio: 3250, 
				cantidad: 0,
				get total() {
					return this.cantidad*this.precio;
				}
			},
			{
				ref: "055-236A", 
				detalle: "Café instantáneo Colcafe 170 g.", 
				precio: 7560, 
				cantidad: 0,
				get total() {
					return this.cantidad*this.precio;
				}
			},
			{
				ref: "029-569A", 
				detalle: "Azúcar blanca Manuelita 1 K.", 
				precio: 2160, 
				cantidad: 0,
				get total() {
					return this.cantidad*this.precio;
				}
			}
		],
		nombreClienteIngresado: "",
		documentoClienteIngresado: "",
		direccionClienteIngresada: "",
		telefonoClienteIngresado: "",
		fechaFacturaIngresada: "",
		nombreVendedorIngresado: "",
		productosSeleccionados: []
	},
	computed: 
	{
		getTotalProducto() 
        {
	    	return (
	    		this.precio * this.cantidad
	    	)
	    },
        getSubtotal() 
        {
	    	return this.productosSeleccionados.reduce(
	    		(total, producto) => total + producto.precio * producto.cantidad, 0
	    	)
	    },
	    getIVA() 
	    {
	    	return (
	    		Math.round(this.getSubtotal*0.19)
	    	)
	    },
	    getTotal()
	    {
	    	return (
	    		this.getSubtotal + this.getIVA
	    	)
	    }
    },
	methods:
	{
		moverProducto: function(event, producto)
		{
			if (event.target.checked)
			{
				this.productosSeleccionados.push(producto);
			}
			else
			{
				this.productosSeleccionados = this.productosSeleccionados.filter(function(item){
			       return item != producto;
			    });
			}
		},
		fechaMaxima: function()
		{
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();
			if(dd<10)
			{
		        dd='0'+dd
		    } 
		    if(mm<10){
		        mm='0'+mm
		    } 

			today = yyyy+'-'+mm+'-'+dd;
			return today;
		}
	}
});