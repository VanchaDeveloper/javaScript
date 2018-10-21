var add=document.getElementById('plus');
add.addEventListener('click' , additem);
function additem()
{
    var info = document.getElementById('activity').value;
  if(info){
  var todo=document.getElementById('listTodo');
  var listing = document.createElement('li');
  listing.innerText = info;
  var dive1 =document.createElement('div');
  var dive2 =document.createElement('div');
  var button = document.createElement('button');
  var complete= document.createElement('i');
  var remove = document.createElement('button');
    var deletei= document.createElement('i');
    var maindiv=document.createElement('div');
  listing.classList.add('toList');
  dive1.classList.add('diveList')
    dive2.classList.add('diveeList')
    maindiv.classList.add('maindiv')
remove.classList.add('btnrem');
  button.classList.add('btnbtn');
  complete.classList.add('complete');
  complete.classList.add('fa');
    complete.classList.add('fa-check');
      deletei.classList.add('deletei');
    deletei.classList.add('fa');
    deletei.classList.add('fa-trash');
    button.appendChild(complete);
    remove.appendChild(deletei);
  dive2.appendChild(listing);
  dive1.appendChild(remove);
    dive1.appendChild(button);
    maindiv.appendChild(dive2);
maindiv.appendChild(dive1);
  todo.appendChild(maindiv);
}
else {
  window.alert("enter an activity");
}
remove.addEventListener('click' , removefun);
button.addEventListener('click' , addInCom);
}
function removefun()
{
var  item=this.parentNode.parentNode;
var parent=this.parentNode.parentNode.parentNode;
parent.removeChild(item);
}

function addInCom()
{
  var  item=this.parentNode.parentNode;
  var parent=this.parentNode.parentNode.parentNode;
  var parentId=parent.id;
  var target;
  if(parentId=='listTodo')
{
target= document.getElementById('listTodoCom');
this.style='color:#E1F5FE;background-color:#25b99a;border:2px solid #E1F5FE';
}
else
  {
    target=document.getElementById('listTodo');
    this.style='background-color:#E1F5FE;color:#25b99a;';
}
parent.removeChild(item);
target.appendChild(item);
}
