const typingElement = document.querySelector(".typing");

const words = [
"Web Developer",
"CSE Student",
"Programmer",
"Frontend Developer",
"Tech Enthusiast"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){

const currentWord = words[wordIndex];

if(!deleting){

typingElement.textContent =
currentWord.substring(0,charIndex+1);

charIndex++;

if(charIndex === currentWord.length){

deleting = true;

setTimeout(typeEffect,1500);

return;
}

}

else{

typingElement.textContent =
currentWord.substring(0,charIndex-1);

charIndex--;

if(charIndex === 0){

deleting = false;

wordIndex++;

if(wordIndex === words.length){
wordIndex = 0;
}

}

}

setTimeout(typeEffect,deleting ? 70 : 120);

}

typeEffect();



// SCROLL REVEAL

const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:0.2
});

document.querySelectorAll(
".about,.skills,.education,.projects,.contact,.project-card,.timeline-item"
).forEach(el=>{

el.classList.add("hidden");

observer.observe(el);

});



// ACTIVE NAVBAR

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll("nav ul li a");

window.addEventListener("scroll",()=>{

let current = "";

sections.forEach(section=>{

const sectionTop = section.offsetTop - 150;

if(pageYOffset >= sectionTop){

current = section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(
link.getAttribute("href")
=== "#" + current
){
link.classList.add("active");
}

});

});



// MOBILE MENU

const menuBtn =
document.querySelector(".menu-btn");

const nav =
document.querySelector("nav");

menuBtn.addEventListener("click",()=>{

if(nav.style.display==="block"){

nav.style.display="none";

}

else{

nav.style.display="block";

}

});



// SMOOTH BUTTON EFFECT

document.querySelectorAll(".btn")
.forEach(button=>{

button.addEventListener("mouseenter",()=>{

button.style.transform =
"translateY(-4px)";

});

button.addEventListener("mouseleave",()=>{

button.style.transform =
"translateY(0px)";

});

});



// SCROLL TO TOP BUTTON

const topBtn =
document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

topBtn.style.position = "fixed";
topBtn.style.right = "20px";
topBtn.style.bottom = "20px";
topBtn.style.width = "50px";
topBtn.style.height = "50px";
topBtn.style.border = "none";
topBtn.style.borderRadius = "50%";
topBtn.style.cursor = "pointer";
topBtn.style.background = "#00abf0";
topBtn.style.color = "#fff";
topBtn.style.fontSize = "22px";
topBtn.style.display = "none";
topBtn.style.zIndex = "999";

window.addEventListener("scroll",()=>{

if(window.scrollY > 400){

topBtn.style.display = "block";

}
else{

topBtn.style.display = "none";

}

});

topBtn.addEventListener("click",()=>{

window.scrollTo({
top:0,
behavior:"smooth"
});

});