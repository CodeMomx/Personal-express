/* Create List

something for user input 

sonthing to submit user input
something to listen to user's click
put input into list
e to prevent default refresh 
add list to DOM
be able to remove task added to list
add somethihng to clear whole list
*/

const toDoInput = document.getElementById('toDoInput')
// const toDoList = document.getElementById('toDoList')


// function crossingOut(e){
  // e.target.classList.toggle('cross')
// }

function removeAll(){
  document.querySelectorAll('li').forEach(li => li.remove())
}


// toDoList.addEventListener('click', crossingOut)
document.getElementById('clearList').addEventListener('click', removeAll)
let trash = document.querySelectorAll(".deleteTask")
console.log('trash')
trash.forEach(function(element) {
  element.addEventListener('click', function(){
    const task = this.parentNode.childNodes[1].innerText
    console.log('task', task)
    fetch('deleteTasks', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'task': task,
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});
let crossOutButton = document.querySelectorAll('.crossOut')
crossOutButton.forEach(function(element) {
  element.addEventListener('click', function(e){
    const task = this.parentNode.childNodes[1]
      task.classList.toggle('cross')
    fetch('crossOut', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'task': task.innerText, 
        'crossout': true
      })
    }).then(function (response) {
      if(response.ok) return response.json()
      // window.location.reload()
    })
  });
});