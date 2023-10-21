function savetodos(event) {
    event.preventDefault();
    let todoname = event.target.todos.value;
    let description = event.target.todosdescription.value;

    let myObj = {
        todoname,
        description
    }
    axios.post('https://crudcrud.com/api/4ab0417202644f5285280666c9064024/todosData',myObj)
    .then((res)=>{
      showtodosonscreen(res.data)
  
    })
    .catch((error)=>{
      document.body.innerHTML = document.body.innerHTML + "<h4>somtheing went wrong</h4>";
      console.log(error)
    })
    window.addEventListener('DOMContentLoaded',()=>{
        axios.get('https://crudcrud.com/api/4ab0417202644f5285280666c9064024/todosData')
        .then((res)=>{
          console.log(res)
          for(var i =0;i<res.data.length;i++){
            showtodosonscreen(res.data[i]);
          }
        })
        .catch((error)=>{
          document.body.innerHTML = document.body.innerHTML + "<h4>somtheing went wrong</h4>";
          console.log(error)
        })
         
        })
    
}
function showtodosonscreen(obj) {
    let parentElement = document.getElementById('listOfTodods')
    let childElement = document.createElement('li')
    childElement.textContent = obj.todoname + " " + obj.description
  
    

    // button for true

    let doneButton = document.createElement('input');
    doneButton.type = 'button';
    doneButton.value = 'Done';
    doneButton.className = 'btn2';
    doneButton.onclick = () => {
         let donework = document.getElementById('heading3');
         donework.appendChild(childElement)
        axios.delete(`https://crudcrud.com/api/4ab0417202644f5285280666c9064024/todosData/${obj._id}`)
            .then((res) => {
                console.log(res);
                parentElement.removeChild(childElement);
            })
            .catch((error) => {
                console.log(error)
            })
         

    }
    childElement.appendChild(doneButton)
    parentElement.appendChild(childElement)


}