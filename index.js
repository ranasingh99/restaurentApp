
    function getorderdetail(event){

    event.preventDefault();
    let price = event.target.price.value;
    let dish = event.target.dish.value;
    let table = event.target.ordertable.value;
   let obj = 
   {
    price,
    dish,
    table
   }
  axios.post('https://crudcrud.com/api/01ac4360412d4fb88ccead439e819fa7/orderData',obj)
  .then((res)=>{
    showonscreen(res.data)

  })
  .catch((error)=>{
    document.body.innerHTML = document.body.innerHTML + "<h4>somtheing went wrong</h4>";
    console.log(error)
  })
  window.addEventListener('DOMContentLoaded',()=>{
  axios.get('https://crudcrud.com/api/01ac4360412d4fb88ccead439e819fa7/orderData')
  .then((res)=>{
    console.log(res)
    for(var i =0;i<res.data.length;i++){
      showonscreen(res.data[i]);
    }
  })
  .catch((error)=>{
    document.body.innerHTML = document.body.innerHTML + "<h4>somtheing went wrong</h4>";
    console.log(error)
  })
   
  })
  
}

  
  function showonscreen(obj){
    
    let parentElement = document.getElementById('listofOrder')
    let childElement = document.createElement('li')
    childElement.textContent = obj.price+" "+obj.dish+" "+obj.table;
    
    //deletebutton


    let deleteButton = document.createElement('input');
    deleteButton.type = 'button';
    deleteButton.value = 'Delete';
    deleteButton.className = 'btn2';
    
    deleteButton.onclick = ()=>{
   
    //parentElement.removeChild(childElement);
     axios.delete(`https://crudcrud.com/api/01ac4360412d4fb88ccead439e819fa7/orderData/${obj._id}`)
     .then((res)=>{
       console.log(res);
     })
     .catch((error)=>{
       console.log(error)
     })
     parentElement.removeChild(childElement);

    }
    //  add edit button 

 let editButton = document.createElement('input');
 editButton.type = 'button';
 editButton.value = 'Edit';
 editButton.className = 'btn3';
 editButton.onclick = ()=>{
  
    parentElement.removeChild(childElement);
    axios.put(`https://crudcrud.com/api/01ac4360412d4fb88ccead439e819fa7/orderData/${obj._id}`)
    .then((res)=>{
      console.log(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })
 }
     childElement.appendChild(deleteButton)
     childElement.appendChild(editButton)
     parentElement.appendChild(childElement); 

   
}