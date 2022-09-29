"use strict";
const slider = function () {
    const slides = document.querySelectorAll('.hero-slide');
    const indexContainer = document.querySelector('.index-num');
    const slideTexts= document.querySelectorAll(".slide-texts");
    const imgs= document.querySelectorAll('.slide-img');
    const navPrev= document.querySelector('.nav-prv');
    const navNext= document.querySelector('.nav-next');
  
    let curSlide = 0;
    const maxSlide = slides.length;

    slideTexts.forEach((text,i)=>{
        text.setAttribute("data-slide",i);
    })
    imgs.forEach((img,i)=>{
      img.setAttribute("data-slide",i);
  })
  
    // Functions
    const createDots = function () {
      slides.forEach(function (_, i) {
        indexContainer.insertAdjacentHTML(
          'beforeend',
          `<span class="index-no" data-slide="${i}">${i+1}</span>`
        );
      });
    };


    const activateDot = function (slide) {
      document
        .querySelectorAll('.index-no')
        .forEach(dot => {
            dot.classList.remove('active-slide')
        });
        imgs.forEach((img,i)=>{
          img.classList.add('move-column');
      })
        slideTexts.forEach((heading,i)=>{
            heading.classList.add('move-headings');
        })
  
      document
        .querySelector(`.index-no[data-slide="${slide}"]`)
        .classList.add('active-slide');
        document
        .querySelector(`.slide-texts[data-slide="${slide}"]`).classList.remove('move-headings');
        document
        .querySelector(`.slide-img[data-slide="${slide}"]`).classList.remove('move-column');
        
    };
  
    const goToSlide = function (slide) {
      slides.forEach(
        (s, i) =>{
          s.style.transform = `translateX(${100 * (i - slide)}%)`
          s.style.transition='2s';
        }
        
      );
    };
  
    // Next slide
    const nextSlide = function () {
      if (curSlide === maxSlide - 1) {
        curSlide = 0;
      } else {
        curSlide++;
      }
  
      goToSlide(curSlide);
      activateDot(curSlide);
      
    };
  
    const prevSlide = function () {
      if (curSlide === 0) {
        curSlide = maxSlide - 1;
      } else {
        curSlide--;
      }
      goToSlide(curSlide);
      activateDot(curSlide);
  
    };
  
    const init = function () {
      goToSlide(0);
      createDots();
      activateDot(0);
    };
    init();
  
    // Event handlers

    navNext.addEventListener('click', nextSlide);
    navPrev.addEventListener('click', prevSlide);
  
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') prevSlide();
      e.key === 'ArrowRight' && nextSlide();

    });
  
    indexContainer.addEventListener('click', function (e) {
      if (e.target.classList.contains('index-no')) {
        const { slide } = e.target.dataset;       
        setTimeout( goToSlide(slide),3000);
        // goToSlide(slide);
        activateDot(slide);

      }
    });
  };
  slider();