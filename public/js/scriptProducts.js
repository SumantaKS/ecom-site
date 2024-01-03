"use strict";
//after scrolling through 300% of image height
function initScrollConsole() {
  const scroll = new ScrollMagic.Controller();

  new ScrollMagic.Scene({
    duration: "300%",
    triggerElement: ".consoleImgWrap",
    triggerHook: 0,
  })
    .setPin(".consoleImgWrap")
    .addTo(scroll);
}

//function is implemented for each of the six products
function initScrollLaptop() {
  const scroll = new ScrollMagic.Controller();

  new ScrollMagic.Scene({
    duration: "300%",
    triggerElement: ".laptopImgWrap",
    triggerHook: 0,
  })
    .setPin(".laptopImgWrap")
    .addTo(scroll);
}
function initScrollGamepad() {
  const scroll = new ScrollMagic.Controller();

  new ScrollMagic.Scene({
    duration: "200%",
    triggerElement: ".gamepadImgWrap",
    triggerHook: 0,
  })
    .setPin(".gamepadImgWrap")
    .addTo(scroll);
}
function initScrollGpu() {
  const scroll = new ScrollMagic.Controller();

  new ScrollMagic.Scene({
    duration: "200%",
    triggerElement: ".gpuImgWrap",
    triggerHook: 0,
  })
    .setPin(".gpuImgWrap")
    .addTo(scroll);
}
function initScrollMonitor() {
  const scroll = new ScrollMagic.Controller();

  new ScrollMagic.Scene({
    duration: "200%",
    triggerElement: ".monitorImgWrap",
    triggerHook: 0,
  })
    .setPin(".monitorImgWrap")
    .addTo(scroll);
}
function initScrollPhone() {
  const scroll = new ScrollMagic.Controller();

  new ScrollMagic.Scene({
    duration: "200%",
    triggerElement: ".phoneImgWrap",
    triggerHook: 0,
  })
    .setPin(".phoneImgWrap")
    .addTo(scroll);
}

initScrollConsole();
initScrollLaptop();
initScrollGamepad();
initScrollGpu();
initScrollMonitor();
initScrollPhone();
