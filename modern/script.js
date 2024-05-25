//  locomotive code from github

const scroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
});

var timeout = 0;

function circleChaptaKaro() {
  // define default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    var xdiff = dets.clientX - xprev;
    var ydiff = dets.clientY - yprev;

    yscale = gsap.utils.clamp(0.9, 1.2, ydiff);
    xscale = gsap.utils.clamp(0.9, 1.2, xdiff);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector(
        ".minicircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
    }, 100);
  });
}

function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from(".nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      delay: -1.5,
      duration: 3,
      stagger: 0.2,
    })
    .from(".herofooter", {
      y: -10,
      delay: -1,
      opacity: 0,
      duration: 1.5,
      ease: Expo.easeInOut,
    });
}

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      ".minicircle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`;
  });
}

circleChaptaKaro();
circleMouseFollower();
firstPageAnim();

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var diffY = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diffY,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot),
    });
  });
});
