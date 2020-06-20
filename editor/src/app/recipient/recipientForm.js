document.getElementById('button1').addEventListener('click',
function() {
    document.querySelector('.bg-model').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click',
function(){
    document.querySelector('.bg-model').style.display ='none';
});