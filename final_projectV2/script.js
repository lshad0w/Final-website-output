document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const href = this.getAttribute("href");
        const target = document.querySelector(href);
        if (target) {
          let scrollToPosition = target.offsetTop;
          if (href === "#section2") {

            scrollToPosition = target.offsetTop + (target.offsetHeight / 2) - (window.innerHeight / 2);
            scrollToPosition = Math.max(0, scrollToPosition);
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            scrollToPosition = Math.min(scrollToPosition, maxScroll);
          }
          window.scrollTo({
            top: scrollToPosition,
            behavior: "smooth"
          });
        }
      });
    });
  
    let currentIndex = 0;
    const items = document.querySelectorAll(".carousel-item");
    const dots = document.querySelectorAll(".dot");
    let autoPlayInterval;
    const autoPlayDelay = 4000;

    // Update dots to show which slide is active
    function updateDots(index) {
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    // Function to reset and start auto-play
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(() => {
            moveCarousel(1); 
        }, autoPlayDelay);
    }
    
    // Function to jump directly to a specific slide
    function jumpToSlide(index) {
      if (index === currentIndex) return;
      
      const direction = index > currentIndex ? 1 : -1;
      
      // Hide current image
      items[currentIndex].style.transition = "left 0.5s ease-in-out, opacity 0.5s ease-in-out";
      items[currentIndex].style.left = direction > 0 ? "-100%" : "100%";
      items[currentIndex].style.opacity = "0";
      
      // Show target image
      items[index].style.transition = "none";
      items[index].style.left = direction > 0 ? "100%" : "-100%";
      items[index].style.opacity = "0";
      
      setTimeout(() => {
        items[index].style.transition = "left 0.5s ease-in-out, opacity 0.5s ease-in-out";
        items[index].style.left = "0";
        items[index].style.opacity = "1";
        
        // Update currentIndex
        currentIndex = index;
        updateDots(currentIndex);
        resetAutoPlay(); 
      }, 50);
    }
  
    function moveCarousel(direction) {
      // Calculate the new index
      const newIndex = (currentIndex + direction + items.length) % items.length;
  
      // Set the current and new items
      const currentItem = items[currentIndex];
      const nextItem = items[newIndex];
  
      // Determine the direction of movement
      const offset = direction > 0 ? "100%" : "-100%";
  
      // Animate the current item out
      currentItem.style.transition = "left 0.5s ease-in-out, opacity 0.5s ease-in-out";
      currentItem.style.left = direction > 0 ? "-100%" : "100%";
      currentItem.style.opacity = "0";
  
      // Position the next item and animate it in
      nextItem.style.transition = "none";
      nextItem.style.left = offset;
      nextItem.style.opacity = "0";
      setTimeout(() => {
          nextItem.style.transition = "left 0.5s ease-in-out, opacity 0.5s ease-in-out";
          nextItem.style.left = "0";
          nextItem.style.opacity = "1";
      }, 50);
  
      currentIndex = newIndex;
      updateDots(currentIndex); 
      if (direction !== undefined) { 
        resetAutoPlay(); 
      }
    }
  
    updateDots(0);
    resetAutoPlay();
  
    // Expose functions to global scope for HTML onclick attributes
    window.moveCarousel = moveCarousel;
    window.jumpToSlide = jumpToSlide;
});

// Navigation color change based on section in view
document.addEventListener("scroll", function () {
    const navContainer = document.querySelector(".top-nav-container");
    if (!navContainer) return;

    const sections = [
        document.getElementById("section1"),
        document.getElementById("about"),
        document.getElementById("section2"),
        document.getElementById("section3")
    ];

    // Reference point: just below the nav bar
    const navRect = navContainer.getBoundingClientRect();
    const refY = navRect.bottom;

    let activeSection = null;
    for (let section of sections) {
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        if (rect.top <= refY && rect.bottom > refY) {
            activeSection = section.id;
            break;
        }
    }

    const pill = navContainer.querySelector('.top-nav');
    const hover = navContainer.querySelector('.top-nav a:hover');
    if (!pill) return;

    if (activeSection === "section1") {
        pill.style.backgroundColor = "white";
        pill.style.color = "black";
        pill.querySelectorAll("a").forEach(link => link.style.color = "black");
        hover.style.color = "#5DAFE1";
        const moon = navContainer.querySelector('.moon-icon svg path');
        if (moon) moon.style.stroke = "white";
    } 
    else if (activeSection === "about") {
        pill.style.backgroundColor = "black";
        pill.style.color = "white";
        pill.querySelectorAll("a").forEach(link => link.style.color = "white");
        hover.style.color = "#5DAFE1";
        const moon = navContainer.querySelector('.moon-icon svg path');
        if (moon) moon.style.stroke = "black";
    }  else if (activeSection === "section3") {
        pill.style.backgroundColor = "black";
        pill.style.color = "white";
        pill.querySelectorAll("a").forEach(link => link.style.color = "white");
        hover.style.color = "#5DAFE1";
        const moon = navContainer.querySelector('.moon-icon svg path');
        if (moon) moon.style.stroke = "black";
    } else {
        pill.style.backgroundColor = "white";
        pill.style.color = "black";
        pill.querySelectorAll("a").forEach(link => link.style.color = "black");
        const moon = navContainer.querySelector('.moon-icon svg path');
        hover.style.color = "#5DAFE1";
        if (moon) moon.style.stroke = "white";
    }
});


