document.addEventListener("DOMContentLoaded", function () {
  const mensajeAlProveedor = document.getElementById("mensajeAlProveedor");
  const pedidoAlProveedor = document.getElementById("pedidoAlProveedor");
  const mensajeFinal = document.getElementById("mensajeFinal");
  const botonUnirMensajes = document.getElementById("unirMensajes");

  botonUnirMensajes.addEventListener("click", function () {
    const mensaje = mensajeAlProveedor.value;
    const pedido = pedidoAlProveedor.value;
    mensajeFinal.value = mensaje + "\n" + pedido;
  });
});

//Enviar mensaje al proveedor
document
  .getElementById("enviarWhatsApp")
  .addEventListener("click", function () {
    const mensaje = document.getElementById("mensajeFinal").value;

    if (mensaje.trim() === "") {
      Swal.fire("Por favor, escribí un mensaje antes de enviarlo.");
      return;
    }

    const mensajeCodificado = encodeURIComponent(mensaje);
    const enlaceWhatsApp = `https://wa.me/?text=${mensajeCodificado}`;
    window.open(enlaceWhatsApp, "_blank");
  });
