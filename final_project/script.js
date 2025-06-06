document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const href = this.getAttribute("href");
        const target = document.querySelector(href);
        if (target) {
          let scrollToPosition = target.offsetTop;
          if (href === "#section2") {
            // Calculate position to center section2
            // newScrollY = target.offsetTop + targetHeight/2 - viewportHeight/2
            scrollToPosition = target.offsetTop + (target.offsetHeight / 2) - (window.innerHeight / 2);
            // Ensure we don't scroll to a negative position or beyond the document limits
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
    const autoPlayDelay = 4000; // 4 seconds
    
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
            moveCarousel(1); // Move to the next slide
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
        resetAutoPlay(); // Reset auto-play timer on manual interaction
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
      updateDots(currentIndex); // Update the active dot
      if (direction !== undefined) { // Check if called by user or auto-play
        resetAutoPlay(); // Reset auto-play timer on manual interaction
      }
    }
  
    // Initialize the dots
    updateDots(0);
    // Start auto-play
    resetAutoPlay();
  
    // Expose functions to global scope for HTML onclick attributes
    window.moveCarousel = moveCarousel;
    window.jumpToSlide = jumpToSlide;
  });