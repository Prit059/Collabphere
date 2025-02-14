let t1 = gsap.timeline();
t1.from(".head",{
  y: -100,
  opacity: 0,
  duration: 0.7,
  
})
t1.from(".top1 h1,.top1 p,ul",{
  x: 100,
  opacity: 0,
  duration: 0.6,
  // ease: "elastic.out(1, 0.6)",
})

t1.from(".bannerContentBtn button,.formpage,.counterSection",{
  x:100,
  opacity: 0,
  duration:0.5,
})


gsap.from(".top2 h1,.top2 p",{
  Transform: "translateX(-88%)",
  scrollTrigger: {
    trigger: ".top2",
    scroller: "body",
    // markers: true,
    start: "top 80%",
    end: "top 0%", 
  }
})

gsap.from(".top3",{
  Transform: "translateX(-150%)",
  scrollTrigger: {
    trigger: ".top3",
    scroller: "body",
    // markers: true,
    start: "top 75%",
    end: "top 0%", 
  }
})
gsap.from(".but3",{
  // Transform: "translateX(-150%)",
  opacity: 0,
  y: 100,
  scale: 1.5,
  duration:0.9,
  ease: "elastic.out(1, 0.6)",
  
    scrollTrigger:{
    trigger: ".top3",
    scroller: "body",
    start: "top 45%",
    end: "top 80%",
    opacity: 1,
  }
})

gsap.from(".clubs h1,.clubs p",{
  Transform: "translateX(-88%)",
  scrollTrigger: {
    trigger: ".clubs",
    scroller: "body",
    // markers: true,
    start: "top 80%",
    end: "top 0%", 
  }
})

gsap.from(".top4",{
  Transform: "translateX(-150%)",
  scrollTrigger: {
    trigger: ".top4",
    scroller: "body",
    // markers: true,
    start: "top 75%",
    end: "top 0%", 
  }
})
gsap.from(".but4",{
  // Transform: "translateX(-150%)",
  opacity: 0,
  y: 100,
  scale: 1.5,
  duration:0.9,
  ease: "elastic.out(1, 0.6)",

    scrollTrigger:{
      trigger: ".clubs",
      scroller: "body",
      start: "top 45%",
      end: "top 80%",
      opacity: 1,
    }
})