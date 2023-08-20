// Execution starts after the HTML document has been fully loaded
document.addEventListener('DOMContentLoaded', () => {

    const slider = document.querySelector('.card-slider');
    const cards = document.querySelectorAll('.card');
    const cardWidth = cards[0].offsetWidth; // Width of a single card element
    const numOfCards = cards.length;
    const isMobile = window.matchMedia('(max-width: 768px)').matches; // Check for mobile screen
    const visibleCards = isMobile ? 2 : 4; // Show 2 cards at a time on mobile and 4 cards on larger screens
    const visibleWidth = visibleCards * cardWidth; // Calculate the total visible width
    const slidebar = document.querySelector('.slidebar');
    const slidebarIncrement = 100 / (numOfCards / visibleCards); // Calculate the slidebar increment

    let currentIndex = 0;

    // Set the initial slidebar width to 10%
    slidebar.style.width = '10%';

    // Touch gesture variable for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    /**
     * Add touch event listeners
     * Passive is enabled to inform the browser that the event listener will not prevent vertical scrolling
    */
    slider.addEventListener('touchstart', (event) => {
        touchStartX = event.touches[0].clientX;
    }, { passive: true });

    slider.addEventListener('touchend', (event) => {
        touchEndX = event.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });

    // Function to handle swipe on mobile
    const handleSwipe = () => {
        const deltaX = touchEndX - touchStartX; // Calculate difference in X positions
        // Handle swipe to the right
        if (deltaX > 50) {
            slideToIndex(currentIndex - 1);
        }
        // Handle swipe to the left
        else if (deltaX < -50) {
            slideToIndex(currentIndex + 1);
        }
    };

    // Calculate the number of card sets
    const numOfCardSets = Math.ceil(numOfCards / visibleCards);

    // Function to handle the general sliding behavior
    const slideToIndex = (index) => {

        if (index < 0) {
            index = numOfCardSets - 1;
        }
        else if (index >= numOfCardSets) {
            index = 0;
        }

        const slideDistance = index * visibleWidth;
        slider.style.transform = `translateX(-${slideDistance}px)`;
        currentIndex = index; // Update the currently displayed card sets

        // Update slidebar width based on the current index and increment
        const slidebarWidth = (currentIndex * slidebarIncrement) + 10;
        slidebar.style.width = `${slidebarWidth}%`;
    };

    // Previous button click handler
    document.getElementById('prevBtn').addEventListener('click', () => {
        slideToIndex(currentIndex - 1);
    });

    // Next button click handler
    document.getElementById('nextBtn').addEventListener('click', () => {
        slideToIndex(currentIndex + 1);
    });

});