var input ;
const huInput='O';
const coInput='X';
const winCom=[
[0,1,2],
[3, 4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];
const cells = document.querySelectorAll('.cell');
startGame();
function startGame()
{
document.getElementById('resultdiv').style.display='none';
input=[0,1,2,3,4,5,6,7,8];
for(let i=0;i<cells.length;i++){
cells[i].innerText = ' ' ;
cells[i].style.removeProperty('background-color');
cells[i].addEventListener('click' , clicking);
}
}
function clicking(sq)
{
  if(typeof input[sq.target.id]=='number')
  {
    turn(sq.target.id , huInput);
    if(!checkTie())
    turn(bestspot(),coInput);
  }
}
function turn(sqId , player)
{
input[sqId]=player;
document.getElementById(sqId).innerText=player;
let gameWon = checkWin(input , player);
if(gameWon)
gameOver(gameWon)
}
function checkWin(board , player)
{
  let plays=board.reduce((a,e,i)=>
  (e==player)?a.concat(i):a,[]);
  let gameWon =null;
  for(let [index,win] of winCom.entries())
  {
    if(win.every(elem=>plays.indexOf(elem) > -1))
    {
    gameWon ={ index:index , player:player};
  break;
}}
  return gameWon;
}
function gameOver(gameWon)
{
  for (let index of winCom[gameWon.index])
  {
    document.getElementById(index).style.backgroundColor = gameWon.player==huInput ? 'red':'yellow';
  }
  for(let i=0;i<cells.length;i++)
  {
    cells[i].removeEventListener('click' , clicking )
  }
  declareWinner(gameWon.player==huInput ? "You Win!":'You Lose!')
}
function declareWinner(who)
{
  document.querySelector('#resultdiv').style.display='block';
    document.querySelector('.result').innerText=who;
}
function emptySquares()
{
  return input.filter(s=>typeof s=='number');
}
function bestspot()
{
  return minimax(input , coInput).index;
}
function checkTie()
{
  if(emptySquares().length==0)
  {
    for(let i=0;i<cells.length;i++)
    {
      cells[i].style.backgroundColor='red';
      cells[i].removeEventListener('click' , clicking);
    }
      declareWinner("Tie Game!")
      return true;
  }
  return false;
}
function minimax(newBoard , player)
{
  var availSpots = emptySquares();
  if(checkWin(newBoard , huInput)){
  return { score: -10 };
  }
  else if(checkWin(newBoard,coInput)){
  return {score:10};
}
else if(availSpots.length===0)
{
  return {score:0};
}
var moves = [];
for(let i=0;i<availSpots.length;i++)
{
  var move= {} ;
  move.index=newBoard[availSpots[i]];
  newBoard[availSpots[i]]=player;
  if(player==coInput)
  {
    var result = minimax(newBoard ,huInput);
    move.score= result.score;
  }
  else {
    var result = minimax(newBoard ,coInput);
    move.score= result.score;
  }
  newBoard[availSpots[i]]=move.index;
  moves.push(move);
}
var bestMove;
if(player===coInput)
{
  var bestScore= -10000;
  for(let i=0;i<moves.length;i++)
  {
    if(moves[i].score>bestScore)
    {
      bestScore=moves[i].score;
      bestMove=i;
    }
  }
}
else {
  var bestScore= 10000;
  for(let i=0;i<moves.length;i++)
  {
    if(moves[i].score<bestScore)
    {
      bestScore=moves[i].score;
      bestMove=i;
    }
  }
}
return moves[bestMove];
}
