// Defined Varibales
let play = document.querySelector('.play');
let about = document.querySelector('.about');

// Text Change On hover on PLAY button
play.addEventListener('mouseover' ,() =>{
  play.innerText = 'LETS GO 🚀';
});

play.addEventListener('mouseout' ,() =>{
  play.innerText = 'PLAY';
  
})

// Text Change On hover on ABOUT button
about.addEventListener('mouseover' ,() =>{
  about.innerText = 'VIEW 👀';
});

about.addEventListener('mouseout' ,() =>{
  about.innerText = 'ABOUT';
})

