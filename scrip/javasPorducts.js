window.addEventListener('load',()=>{
    const form = document.getElementById('form');
    const titulo=document.getElementById('titulo');
    const precioAR=document.getElementById('precioAR');
    const precioUSD=document.getElementById('precioUSD');
    const fecha=document.getElementById('fecha');
    
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
    var bandera=true;

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
    //Validando campo de precio dolar
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
async function NewProduct(){
    if(validaCampos()){
        const tituloValor=titulo.value.trim();
        const precioARValor=precioAR.value.trim();
        const precioUSDValor=precioUSD.value.trim();
        const fechaValor=fecha.value.trim();
        let producto={
            titulo: tituloValor,
            precioPeso: precioARValor,
            precioDolar: precioUSDValor,
            fecha: fechaValor
          };
          
          fetch(urlBase,{
              method: 'POST',
              headers:{'Content-Type':'application/json'},
              body: JSON.stringify(producto)
          })
          .then(response=>response.text())
          .then(
              function(texto){
                  alert(texto);
                  if(texto.trim()=="OK"){
                      alert('Se creo el producto con exito.');
                  }else{
                      alert(texto);
                  }
              }
          )
          .catch(error =>console.error('Error:', error)); 
    }
}


