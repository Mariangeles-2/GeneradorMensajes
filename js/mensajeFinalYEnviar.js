//Enviar mensaje al proveedor
document.getElementById("enviarWhatsApp").addEventListener("click", function () {
    const mensaje = document.getElementById("mensajeFinal").value;

    if (mensaje.trim() === "") {
        Swal.fire("Por favor, escribí un mensaje antes de enviarlo.");
        return;
    }

    const mensajeCodificado = encodeURIComponent(mensaje);
    const enlaceWhatsApp = `https://wa.me/?text=${mensajeCodificado}`;
    window.open(enlaceWhatsApp, "_blank");
})



