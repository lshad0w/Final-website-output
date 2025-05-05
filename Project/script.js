document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          window.scrollTo({
            top: target.offsetTop,
            behavior: "smooth"
          });
        }
      });
    });
  
    let currentIndex = 0;
    const items = document.querySelectorAll(".carousel-item");
    const dots = document.querySelectorAll(".dot");
    
    // Update dots to show which slide is active
    function updateDots(index) {
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
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
    }
  
    // Initialize the dots
    updateDots(0);
  
    // Expose functions to global scope for HTML onclick attributes
    window.moveCarousel = moveCarousel;
    window.jumpToSlide = jumpToSlide;
  });