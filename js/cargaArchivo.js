document.addEventListener('DOMContentLoaded', function() {
    const contenedorPedidoAlProveedor = document.getElementById('contenedorPedidoAlProveedor');

    const ingresoManual = document.createElement('input');
    ingresoManual.type = 'text';
    ingresoManual.style.width = '45%';
    ingresoManual.style.margin = '30px';
    ingresoManual.placeholder = 'Escribe tu pedido aquí';
    contenedorPedidoAlProveedor.appendChild(ingresoManual);

    const ingresoArchivo = document.createElement('input');
    ingresoArchivo.type = 'file';
    ingresoArchivo.style.display = 'none';

    const botonArvhivo = document.createElement('button');
    botonArvhivo.textContent = 'Cargar archivo';
    botonArvhivo.style.width = '45%';
    botonArvhivo.addEventListener('click', function() {
        ingresoArchivo.click();
    });

    const botonCrearMensaje = document.createElement('button');
    botonCrearMensaje.textContent = 'Crear mensaje';
    botonCrearMensaje.style.display = 'block';
    botonCrearMensaje.style.margin = '0 auto';
    botonCrearMensaje.addEventListener('click', function() {
        let mensajeManual = ingresoManual.value;
        let mensajeArvhico = ingresoArchivo.value;

        if (mensajeManual.trim() === '' && mensajeArvhico.length === 0) {
            Swal.fire('Por favor, escribí un mensaje o carga un archivo antes de enviarlo.');
            return;
        }

        if (mensajeArvhico.length > 0) { //explicame toto porque lloro no entender
            const archivo = ingresoArchivo.files[0];
            const lector = new FileReader();
            lector.onload = function(e) {
            const datos = new Uint8Array(e.target.result);
            const workbook = XLSX.read(datos, { type: 'array' });
            const primeraHoja = workbook.Sheets[workbook.SheetNames[0]];
            const datosTabla = XLSX.utils.sheet_to_json(primeraHoja, { header: 1 });
            mensajeManual = JSON.stringify(datosTabla);
            const mensajeCodificado = encodeURIComponent(mensajeManual);
            const enlaceWhatsApp = `https://wa.me/?text=${mensajeCodificado}`;
            window.open(enlaceWhatsApp, '_blank');
            };
            lector.readAsArrayBuffer(archivo);
            return;
        }
    });
    
    contenedorPedidoAlProveedor.append(ingresoManual, ingresoArchivo, botonArvhivo, botonCrearMensaje);
});

ingresoArchivo.addEventListener('change', function(event) {
    const archivo = event.target.files[0];
    if (archivo) {
        const lector = new FileReader();
        lector.onload = function(e) {
            const datos = new Uint8Array(e.target.result);
            const workbook = XLSX.read(datos, { type: 'array' });
            const primeraHoja = workbook.Sheets[workbook.SheetNames[0]];
            const datosTabla = XLSX.utils.sheet_to_json(primeraHoja, { header: 1 });
            console.log('Contenido de la tabla:', datosTabla);
        };
        lector.readAsArrayBuffer(archivo);
    }
});

