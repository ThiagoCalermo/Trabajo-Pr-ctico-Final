const urlBase="https://api.yumserver.com/16753/products";


function CargarProductos() {
  document.getElementById('lista').setAttribute('style','display:flex');
  document.getElementById('EditarProducto').setAttribute('style','display:none');
  fetch(urlBase)
    .then(response => response.json())
    .then(productos => {
      cargarListaProductos(productos);
      
    })
    .catch(error => console.error('Error:', error));
}


function cargarListaProductos(data  ) {
  let html = '';
  for (let i = 0; i < data.length; i++) {
    html += `
      <tr>
        <td>${data[i].idcod}</td>
        <td>${data[i].titulo}</td>
        <td>${data[i].precioPeso}</td>
        <td>${data[i].precioDolar}</td>
        <td>${data[i].fecha}</td>
        <td>
          <button class="btn" onclick="editarProducto('${data[i].idcod}')">Editar</button>
          <button class="btn" onclick="borrarProducto('${data[i].idcod}')">Borrar</button>
        </td>
      </tr>`;
  };
  document.getElementById('resultados').innerHTML = html;
}


function editarProducto(idcod) {
  
  fetch(`${urlBase}/${idcod}`)
    .then(response => response.json())
    .then(producto => {
     
      document.getElementById('IdCod').value = producto.idcod;
      document.getElementById('titulo').value = producto.titulo;
      document.getElementById('precioAR').value = producto.precioPeso;
      document.getElementById('precioUSD').value = producto.precioDolar;
      document.getElementById('fecha').value = producto.fecha;
      
      document.getElementById('lista').setAttribute('style', 'display:none');
      document.getElementById('EditarProducto').setAttribute('style','display:flex');
    })
    .catch(error => console.error('Error:', error));
}



function GuardarCambios() {
  const data = {
    idcod: document.getElementById('IdCod').value,
    titulo: document.getElementById('titulo').value,
    precioPeso: document.getElementById('precioAR').value,
    precioDolar: document.getElementById('precioUSD').value,
    fecha: document.getElementById('fecha').value
  };

  fetch(`${urlBase}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:',error));
    alert('Se modificó un producto');
}


function borrarProducto(idcod) {
  if (window.confirm(`¿Estás seguro de que deseas eliminar el producto con el idcod ${idcod}?`)) {
    fetch(urlBase, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idcod })
    })
      .then(response => response.text())
      .then(result => {
        if (result.trim() == 'OK') {
          alert('Producto eliminado correctamente.');
         
        } else {
          throw new Error(result);
        }
      })
      .catch(error => {
        console.error(error);

        alert('Error al eliminar el producto');
      
      });
  }
}


