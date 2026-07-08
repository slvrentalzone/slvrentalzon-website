const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let current = 0;

function showSlide(index){

    slides.forEach(slide =>
        slide.classList.remove("active")
    );

    dots.forEach(dot =>
        dot.classList.remove("active")
    );

    slides[index].classList.add("active");

    dots[index].classList.add("active");

}

document.querySelector(".next")
.addEventListener("click",()=>{

    current++;

    if(current >= slides.length){

        current = 0;

    }

    showSlide(current);

});

document.querySelector(".prev")
.addEventListener("click",()=>{

    current--;

    if(current < 0){

        current = slides.length - 1;

    }

    showSlide(current);

});


setInterval(()=>{

    current++;

    if(current >= slides.length){

        current = 0;

    }

    showSlide(current);

},5000);

// Hamburger Menu Toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close mobile menu on link click
document.querySelectorAll("#nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

const cards = document.querySelectorAll(".why-card");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.25
});

cards.forEach(card=>observer.observe(card));

window.addEventListener("scroll",()=>{

    document.querySelector("header")
    .classList.toggle("scrolled",window.scrollY>60);

});

const reveals=document.querySelectorAll(".reveal");

window.addEventListener("scroll",()=>{

reveals.forEach(item=>{

const top=item.getBoundingClientRect().top;

if(top<window.innerHeight-120){

item.classList.add("active");

}

});

});