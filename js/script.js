const consultas = {
    // Función para obtener la selección del usuario
    obtenerSeleccion(opciones) {
      let eleccion;
      // Solicito al usuario que seleccione una opción
      do {
        eleccion = prompt(`Seleccione una opción escribiendo el número correspondiente:\n\n${opciones}`);
      } while (!/^[1-4]$/.test(eleccion)); // Continúo solicitando la selección hasta que sea válida
      return eleccion;
    },
  
    // Función para obtener una edad válida del usuario
    obtenerEdadValida() {
      let edad;
      do {
        // Solicito al usuario que ingrese su edad
        edad = parseInt(prompt("Ingrese su edad:"));
        // Verifico si la edad ingresada es válida
        if (isNaN(edad) || edad < 18 || edad > 120) {
          alert("Por favor, ingrese una edad válida (entre 18 y 120 años).");
        }
      } while (isNaN(edad) || edad < 18 || edad > 120); // Continúo solicitando la edad hasta que sea un número válido entre 18 y 120
      return edad;
    },
  
    // Función para que el usuario seleccione la fecha de la consulta
    obtenerFechaSeleccionada() {
      let eleccionFecha;
      do {
        // Solicito al usuario que seleccione una opción de fecha
        eleccionFecha = prompt(`Seleccione una opción escribiendo el número correspondiente:\n\n1. Dentro de las próximas 24 horas\n2. Dentro de la próxima semana\n3. Dentro del próximo mes`);
      } while (!/^[1-3]$/.test(eleccionFecha)); // Continúo solicitando la selección hasta que sea válida
      return eleccionFecha;
    },
  
    // Función para obtener la fecha de la consulta
    obtenerFechaConsulta() {
      let fechaActual = new Date();
      let fechaConsulta;
  
      switch (this.obtenerFechaSeleccionada()) {
        case "1":
          // Dentro de las próximas 24 horas
          fechaActual.setDate(fechaActual.getDate() + 1);
          fechaConsulta = fechaActual;
          break;
        case "2":
          // Dentro de la próxima semana
          fechaActual.setDate(fechaActual.getDate() + 7);
          fechaConsulta = fechaActual;
          break;
        case "3":
          // Dentro del próximo mes
          fechaActual.setMonth(fechaActual.getMonth() + 1);
          fechaConsulta = fechaActual;
          break;
      }
  
      return fechaConsulta;
    },
  
    // Función para calcular el costo de la consulta
    calcularCostoConsulta(edad, esPrimeraConsulta, esTerceraOMas, fechaConsulta) {
      let costoBase;
  
      // Determino el costo base según la fecha de la consulta
      if (fechaConsulta <= this.sumarDias(new Date(), 1)) {
        costoBase = 3500; // Dentro de las primeras 24 horas
      } else if (fechaConsulta <= this.sumarDias(new Date(), 7)) {
        costoBase = 3000; // Dentro de la próxima semana
      } else {
        costoBase = 2500; // Luego de 1 semana
      }
  
      // Agrego costo adicional para personas mayores de 40 años
      if (edad > 40) {
        costoBase += 1000;
      }
  
      // Aplico descuentos según el tipo de consulta
      if (esPrimeraConsulta) {
        costoBase += 1000; // Agrego $1000 para la primera consulta
      } else if (!esTerceraOMas) {
        costoBase *= 0.8; // Descuento del 20% para la segunda consulta
      } else {
        costoBase *= 0.9; // Descuento del 10% para tercera consulta o más
      }
  
      // Muestro el costo de la consulta al usuario
      let mensaje = esPrimeraConsulta ? "primera" : (esTerceraOMas ? "tercera o más" : "segunda");
      alert(`Costo de la consulta en ${mensaje} vez: $${costoBase}`);
    },
  
    // Función para calcular el costo del certificado de aptitud física
    calcularCostoCertificado() {
      let costoBase = 4000; // Es el mismo para cualquier edad o cualquier fecha
      alert(`Costo del certificado de aptitud física: $${costoBase}`);
    },
  
    // Función para sumar días a una fecha
    sumarDias(fecha, dias) {
      let nuevaFecha = new Date(fecha);
      nuevaFecha.setDate(nuevaFecha.getDate() + dias);
      return nuevaFecha;
    },
  
    // Función para mostrar las opciones al usuario
    mostrarOpciones() {
      // Defino las opciones disponibles para el usuario
      const opciones = [
        { texto: "Certificado de Aptitud Física", accion: this.calcularCostoCertificado },
        { texto: "Consulta por primera vez", accion: () => this.calcularCostoConsulta(this.obtenerEdadValida(), true, false, this.obtenerFechaConsulta()) },
        { texto: "Consulta por segunda vez", accion: () => this.calcularCostoConsulta(this.obtenerEdadValida(), false, false, this.obtenerFechaConsulta()) },
        { texto: "Consulta por tercera vez o más", accion: () => this.calcularCostoConsulta(this.obtenerEdadValida(), false, true, this.obtenerFechaConsulta()) }
      ];
  
      // Genero el texto de las opciones para mostrar al usuario
      let opcionesTexto = opciones.map((opcion, index) => `${index + 1}. ${opcion.texto}`).join("\n");
  
      // Solicito al usuario que seleccione una opción
      let eleccion = this.obtenerSeleccion(opcionesTexto);
  
      // Ejecuto la acción correspondiente a la opción seleccionada por el usuario
      opciones[eleccion - 1].accion();

      
    // Dar opción para volver a elegir o aclarar que estamos a disposición
    if (confirm("¿Desea realizar otra consulta?")) {
        this.mostrarOpciones(); // Volver a mostrar las opciones
      } else {
        alert("¡Estamos a su disposición para cualquier consulta adicional!");
      }
    }
  };
  
  // Inicio el programa mostrando las opciones al usuario
  consultas.mostrarOpciones();
  
  