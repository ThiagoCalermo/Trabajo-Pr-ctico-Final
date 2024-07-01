let urlBase='https://api.yumserver.com/16753/products';
function ObtenerProductos(){
  fetch(urlBase)
    .then(response=>response.json())
    .then(data => MostrarProductos(data))
    .catch(error=>console.error('Error: ',error));   
}
const MostrarProductos= (data) =>{
  let html='';
  for(let i=0;i<data.length;i++){
    const linn=''+data[i].idcod+'';
    html +=`
            <tr >
                 <td  style="padding: 15px;"><b>${data[i].idcod}</b></td>
                 <td style="padding: 15px;"><b>${data[i].titulo}</b></td>
                 <td style="padding: 15px;">${data[i].precioPeso}</td>
                 <td style="padding: 15px;">${data[i].precioDolar}</td>
                 <td style="padding: 15px;">${data[i].fecha}</td>
            </tr>     
        `
        
        console.log(linn);
  }
  document.getElementById('resultados').innerHTML=html;
}
function BorrarElemento(){
  const id=document.getElementById('borraridInput');
  const idvalor=id.value.trim();
  Borrar(idvalor);
}

function Borrar(idcod) {
  if (confirm(`¿Borrar el producto con el ID: ${idcod}?`)) {
    fetch(`${urlBase}/${idcod}`, {
      method: 'DELETE'
    })
      .then(response => response.text())
      .then(function (texto) {
        if (texto.trim() === "OK") {
          alert(`Producto de ID ${idcod} borrado.`);
          ObtenerProductos(); 
        } else {
          alert(texto);
        }
      })
      .catch(error => console.error('Error:', error));
  } else {
    
  }
}


function MostrarBorrar(){
  var inputBorrar= document.getElementById('borraridInput');
  var buttonBorrar= document.getElementById('borraridButton');
  if(inputBorrar.className==="borrarid" && buttonBorrar.className==="borrarid"){
    inputBorrar.className="borrarid-on";
    buttonBorrar.className="borrarid-on";
  }else{
    inputBorrar.className="borrarid";
    buttonBorrar.className="borrarid";
  }
}

