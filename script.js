// =========================
// LOADER
// =========================

window.addEventListener("load",()=>{

    const loader = document.getElementById("loader");

    setTimeout(()=>{

        loader.style.opacity="0";
        loader.style.visibility="hidden";

    },1800);

});





// =========================
// TYPING EFFECT
// =========================


const typingText = document.querySelector(".typing");


const words = [

    "Front-End Developer",

    "Embedded Systems Developer",

    "Python Developer",

    "IoT Developer"

];


let wordIndex = 0;
let charIndex = 0;
let deleting = false;



function typing(){

    let currentWord = words[wordIndex];


    if(!deleting){

        typingText.textContent =
        currentWord.substring(0,charIndex++);


        if(charIndex > currentWord.length){

            deleting = true;

            setTimeout(typing,1000);

            return;

        }


    }else{


        typingText.textContent =
        currentWord.substring(0,charIndex--);


        if(charIndex < 0){

            deleting=false;

            wordIndex++;

            if(wordIndex >= words.length){

                wordIndex=0;

            }

        }


    }



    setTimeout(typing,deleting ? 60 : 120);

}



typing();









// =========================
// SCROLL REVEAL
// =========================


const reveals = document.querySelectorAll(".reveal");



function reveal(){

    reveals.forEach(item=>{


        let position =
        item.getBoundingClientRect().top;



        if(position < window.innerHeight - 100){

            item.classList.add("active");

        }


    });


}



window.addEventListener("scroll",reveal);

reveal();









// =========================
// COUNTERS
// =========================


const counters = document.querySelectorAll(".counter");


let started=false;



function startCounter(){


    if(started) return;


    if(window.scrollY >

    document.querySelector(".about").offsetTop - 400){


        counters.forEach(counter=>{


            let target =
            Number(counter.dataset.target);



            let count=0;



            let interval=setInterval(()=>{


                count++;


                counter.textContent=count;



                if(count>=target){

                    clearInterval(interval);

                }



            },50);



        });



        started=true;


    }


}



window.addEventListener("scroll",startCounter);









// =========================
// NAVBAR SCROLL EFFECT
// =========================


const header =
document.querySelector(".header");



window.addEventListener("scroll",()=>{


    if(window.scrollY>50){

        header.style.background=
        "rgba(8,17,31,.95)";


    }else{


        header.style.background=
        "rgba(8,17,31,.8)";


    }



});









// =========================
// MOBILE MENU
// =========================


const menuBtn =
document.querySelector(".menu-btn");


const nav =
document.querySelector(".nav-links");



if(menuBtn){


menuBtn.addEventListener("click",()=>{


    nav.classList.toggle("active");


});


}






// close menu after click


document.querySelectorAll(".nav-links a")
.forEach(link=>{


    link.addEventListener("click",()=>{


        nav.classList.remove("active");


    });


});









// =========================
// SCROLL TOP
// =========================


const scrollTop =
document.getElementById("scroll-top");



window.addEventListener("scroll",()=>{


    if(window.scrollY>500){


        scrollTop.classList.add("show");


    }else{


        scrollTop.classList.remove("show");


    }



});





scrollTop.addEventListener("click",()=>{


    window.scrollTo({

        top:0,

        behavior:"smooth"

    });


});









// =========================
// CONTACT FORM
// =========================


const form =
document.querySelector(".contact-form");



if(form){


const form = document.querySelector(".contact-form"); }

if(form){

    form.addEventListener("submit",()=>{

        // allow Formspree submission

    });

}
 