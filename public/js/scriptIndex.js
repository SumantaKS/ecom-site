"use strict";

const allcontainer = gsap.utils.toArray(".container-item");
const venueImageWrap = document.querySelector(".container-image");
const venueImage = document.querySelector(".image");

//iterates through the six letters
function initcontainer() {
  allcontainer.forEach((link) => {
    link.addEventListener("mouseenter", venueHover);
    link.addEventListener("mouseleave", venueHover);
    link.addEventListener("mousemove", moveVenueImage);
  });
}

//this moves the image with respect to cursor position
function moveVenueImage(e) {
  let xpos = e.clientX;
  let ypos = e.clientY;
  const tl = gsap.timeline();
  tl.to(venueImageWrap, {
    x: xpos,
    y: ypos,
  });
}

//to display image on hover over any of the siz letters of the logo
function venueHover(e) {
  if (e.type === "mouseenter") {
    const targetImage = e.target.dataset.img;
    const tl = gsap.timeline();
    tl.set(venueImage, {
      backgroundImage: `url(${targetImage})`,
    }).to(venueImageWrap, {
      duration: 0.5,
      autoAlpha: 1,
    });
  } else if (e.type === "mouseleave") {
    const tl = gsap.timeline();
    tl.to(venueImageWrap, {
      duration: 0.5,
      autoAlpha: 0,
    });
  }
}

function init() {
  initcontainer();
}

window.addEventListener("load", function () {
  init();
});

const timeline = new TimelineMax();

//to display the components of the webpage after a few seconds with a ease effec
timeline.from(".navbar > div", 1.6, {
  opacity: 0,
  y: 60,
  ease: Expo.easeInOut,
  delay: 0.6,
});

timeline.from(
  ".logo",
  1.6,
  {
    opacity: 0,
    y: 40,
    ease: Expo.easeInOut,
  },
  "-=1.6"
);

timeline.staggerFrom(
  ".menu > div",
  1,
  {
    opacity: 0,
    y: 60,
    ease: Power2.easeOut,
  },
  0.2
);

timeline.staggerFrom(
  ".header > div",
  1,
  {
    opacity: 0,
    y: 60,
    ease: Power2.easeOut,
    delay: -1.4,
  },
  0.2
);

timeline.staggerFrom(
  ".container > div",
  1,
  {
    opacity: 0,
    y: 60,
    ease: Power2.easeOut,
    delay: -1.4,
  },
  0.2
);
