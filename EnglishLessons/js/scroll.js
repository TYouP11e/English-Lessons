
console.clear(); 
gsap.registerPlugin(TextPlugin, Observer, ScrollTrigger); 
const sections = gsap.utils.toArray(".slide"); 
const images = gsap.utils.toArray(".image"); 
const slideImages = gsap.utils.toArray(".slide__img"); 
const outerWrappers = gsap.utils.toArray(".slide__outer"); 
const innerWrappers = gsap.utils.toArray(".slide__inner"); 
const count = document.querySelector(".count"); 
const wrap = gsap.utils.wrap(0, sections.length); 
let animating; 
let currentIndex = 0; 
 
 
gsap.set(outerWrappers, { xPercent: 100 }); 
gsap.set(innerWrappers, { xPercent: -100 }); 
gsap.set(".slide:nth-of-type(1) .slide__outer", { xPercent: 0 }); 
gsap.set(".slide:nth-of-type(1) .slide__inner", { xPercent: 0 }); 
function gotoSection(index, direction) { 
  animating = true; 
  index = wrap(index); 
 
  let tl = gsap.timeline({ 
    defaults: { duration: 1, ease: "expo.inOut" }, 
    onComplete: () => { 
      animating = false; 
    }, 
  }); 
  console.log("images", images); 
 
  let currentSection = sections[currentIndex]; 
  let heading = currentSection.querySelector(".slide__heading"); 
  let nextSection = sections[index]; 
  let nextHeading = nextSection.querySelector(".slide__heading"); 
 
  const currentSectionToSet = sections[currentIndex]; 
  const currentImageToSet = images[currentIndex]; 
  const nextSectionToSet = sections[index]; 
  const nextImageToSet = images[index]; 
 
  gsap.set(sections, { zIndex: 0 });  
  gsap.set([currentSectionToSet, currentImageToSet], { 
    zIndex: 1, 
    autoAlpha: 1, 
  }); 
 
  gsap.set([nextSectionToSet, nextImageToSet], { 
    zIndex: 2, 
    autoAlpha: 1, 
  }); 
  
  tl.set(count, { text: index + 1 }, 0.32) 
    .fromTo( 
      outerWrappers[index], 
      { xPercent: 100 * direction }, 
      { xPercent: 0 }, 
      0 
    ) 
    .fromTo( 
      innerWrappers[index], 
      { xPercent: -100 * direction }, 
      { xPercent: 0 }, 
      0 
    ) 
    .fromTo( 
      images[index],  
      { 
        xPercent: 125 * direction, 
        scaleX: 1.5, 
        scaleY: 1.3, 
        duration: 1,  
      }, 
      { xPercent: 0, scaleX: 1, scaleY: 1, duration: 1 }, 
      0 
    ) 
    .fromTo( 
      images[currentIndex],  
      { xPercent: 0, scaleX: 1, scaleY: 1 }, 
      { 
        xPercent: -125 * direction, 
        scaleX: 1.5, 
        scaleY: 1.3, 
        duration: 1,  
      }, 
      0 
    ) 
    .fromTo( 
      slideImages[index], 
      { scale: 2 }, 
      { scale: 1 }, 
      0 
    ) 
    .timeScale(0.8); 
 
  currentIndex = index; 
} 
Observer.create({ 
  target: "#sliders", 
  type: "wheel,touch,pointer", 
  preventDefault: true, 
  wheelSpeed: -1, 
  onUp: () => { 
    if (animating) return; 
    gotoSection(currentIndex + 1, +1); 
  }, 
  onDown: () => { 
    if (animating) return; 
    gotoSection(currentIndex - 1, -1); 
  }, 
  tolerance: 10, 
}); 
 
document.addEventListener("keydown", logKey); 
 
function logKey(e) { 
  console.log(e.code); 
  if ((e.code === "ArrowUp" || e.code === "ArrowLeft") && !animating) { 
    gotoSection(currentIndex - 1, -1); 
  } 
  if ( 
    (e.code === "ArrowDown" || 
      e.code === "ArrowRight" || 
      e.code === "Space" || 
      e.code === "Enter") && 
    !animating 
  ) { 
    gotoSection(currentIndex + 1, 1); 
  } 
}