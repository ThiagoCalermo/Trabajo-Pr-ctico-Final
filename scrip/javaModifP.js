window.addEventListener('load',()=>{
  const form = document.getElementById('form');
  const titulo=document.getElementById('titulo');
  const precioAR=document.getElementById('precioAR');
  const precioUSD=document.getElementById('precioUSD');
  const fecha=document.getElementById('fecha');
  const idcod=document.getElementById('idcod');
  
  form.addEventListener('submit',(x)=>{
      x.preventDefault();
  })
})
function validaCampos(){
  //Capturar los valores ingresados por el campo;
  const tituloValor=titulo.value.trim();
  const precioARValor=precioAR.value.trim();
  const precioUSDValor=precioUSD.value.trim();
  const fechaValor=fecha.value.trim();
  const idcodValor=idcod.value.trim();
  var bandera=true;
  //validando IDco;
  if(!idcodValor){
      validaFalla(idcod,"CAMPO VACIO");
      bandera=false;
   }else{
       validaOk(idcod);
   }
   //validando campo titulo del producto;
  if (!tituloValor){
     validaFalla(titulo,"CAMPO VACIO");
     bandera=false;
  }else{
      validaOk(titulo);
  }

  //Validando campo precio pesos;
  if(!precioARValor){ 
      validaFalla(precioAR,"CAMPO VACIO");
      bandera=false;
  }else{ 
      validaOk(precioAR);
  }
  //Validando campo de precio dolar;
  if(!precioUSDValor){
      validaFalla(precioUSD,"CAMPO VACIO");
      bandera=false;
  }else {
      validaOk(precioUSD);
  }
  //Validando campo de fecha
  if(!fechaValor){
      validaFalla(fecha,"CAMPO VACIO")
      bandera=false;
  }else{
      validaOk(fecha);
  }
  return bandera;
}
function validaFalla(input,msj){
  const formControl=input.parentElement;
  const aviso=formControl.querySelector('p');
  aviso.innerText=msj;

  formControl.className='form-control falla';
}
function validaOk(input){
  const formControl=input.parentElement;
  const aviso=formControl.querySelector('p')
  formControl.className='form-control ok';
  aviso.innerText=" ";
  
}
let urlBase='https://api.yumserver.com/16753/products';
async function ModificarProducto(){
  if(validaCampos()){
      const idcodValor=idcod.value.trim();
      const tituloValor=titulo.value.trim();
      const precioARValor=precioAR.value.trim();
      const precioUSDValor=precioUSD.value.trim();
      const fechaValor=fecha.value.trim();
      let producto={
          idcode:idcodValor,
          titulo: tituloValor,
          precioPeso: precioARValor,
          precioDolar: precioUSDValor,
          fecha: fechaValor
      };
      fetch(urlBase+"/"+idcodValor,{
          method: 'PATCH',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify(producto)
      })
      .then(response=>response.text())
      .then(
          function(texto){
              
              if(texto.trim()=="OK"){
                  alert('Se modifico el producto con exito.');
              }else{
                  alert(texto+" jajajja");
              }
          }
      )
      .catch(error =>console.error('Error:', error)); 
  }
}