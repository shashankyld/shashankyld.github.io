// Get only timeline items (not all li elements)
const timelineItems = document.querySelectorAll('.timeline li');

// Get the popup element and caption container
const popup = document.getElementById('popup');
const popupImage = document.getElementById('popup-image');
const popupCaption = document.getElementById('popup-caption');

// Get the timeline section to determine its boundaries
const timelineSection = document.querySelector('.timeline');

// Track if popup is visible
let isPopupVisible = false;
let activeItem = null;

// Function to show popup
function showPopup(item) {
  // Get the image URL and caption from the data attributes
  const imageUrl = item.getAttribute('data-image');
  const captionText = item.getAttribute('data-caption');
  
  if (imageUrl) {  // Check if an image URL is provided
    popupImage.src = imageUrl;  // Set the source of the image in the popup
    popupCaption.textContent = captionText;  // Set the caption text
    
    // Get timeline section dimensions
    const timelineRect = timelineSection.getBoundingClientRect();
    
    // Calculate the maximum text width across all timeline items
    // This is to find the right edge of the text content, not the entire timeline section
    let maxTextEdge = 0;
    timelineItems.forEach(item => {
      const paragraph = item.querySelector('p');
      if (paragraph) {
        const paragraphRect = paragraph.getBoundingClientRect();
        const textRightEdge = paragraphRect.left + paragraphRect.width;
        maxTextEdge = Math.max(maxTextEdge, textRightEdge);
      }
    });
    
    // Position popup based on screen size
    if (window.innerWidth < 768) {
      // For mobile: center it with the same margins as the body
      popup.style.right = '20px';
      popup.style.left = '20px';
      popup.style.transform = 'none';
      popup.style.width = 'calc(100% - 40px)';
      popup.style.maxWidth = '500px';
      popup.style.margin = '0 auto';
    } else {
      // For desktop: position from the right edge of the longest text item
      const bodyMargin = parseInt(window.getComputedStyle(document.body).marginRight) || 200; 
      
      // Set right edge at the edge of the page with consistent margin
      popup.style.right = bodyMargin + 'px';
      
      // Left edge should be at the maximum text edge
      const leftPos = maxTextEdge + 20; // Add 20px padding between text and popup
      popup.style.left = leftPos + 'px';
      
      // Width is automatically determined by left and right positions
      popup.style.width = 'auto';
      
      // Set a max-width to prevent it from getting too large
      popup.style.maxWidth = (window.innerWidth - leftPos - bodyMargin - 20) + 'px';
    }
    
    // Constrain vertical position to remain within the timeline section boundaries
    const timelineSectionTop = timelineRect.top;
    const timelineSectionBottom = timelineRect.bottom;
    
    // Calculate height for the popup (minus some padding)
    const availableHeight = timelineSectionBottom - timelineSectionTop - 40;
    popup.style.maxHeight = availableHeight + 'px';
    
    // Position popup at the top of the timeline section, not following scroll
    popup.style.position = 'absolute';
    popup.style.top = (timelineSectionTop + window.pageYOffset + 20) + 'px'; // 20px from top for padding
    
    // Show popup
    popup.style.display = 'block';
    setTimeout(() => {
      popup.style.opacity = '1';
    }, 10);
    
    isPopupVisible = true;
    activeItem = item;
  }
}

// Function to hide popup
function hidePopup() {
  popup.style.opacity = '0';
  setTimeout(() => {
    popup.style.display = 'none';
  }, 300);
  
  isPopupVisible = false;
  activeItem = null;
}

// Add click event listener for each timeline item
timelineItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent click from bubbling to document
    
    // If this item is already active, hide popup
    if (activeItem === item && isPopupVisible) {
      hidePopup();
    } else {
      // If another item was active, or no item was active, show popup for this item
      showPopup(item);
    }
  });
});

// Close popup when clicking elsewhere on the page
document.addEventListener('click', (e) => {
  // If popup is visible and click is not on popup
  if (isPopupVisible && !popup.contains(e.target)) {
    hidePopup();
  }
});

// Keep popup open when clicking inside it
popup.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent click from bubbling to document
});

// Update popup position when scrolling to keep it within timeline section
document.addEventListener('scroll', () => {
  if (isPopupVisible && activeItem) {
    // Recalculate position to keep popup in the same place relative to the timeline
    const timelineRect = timelineSection.getBoundingClientRect();
    popup.style.top = (timelineRect.top + window.pageYOffset + 20) + 'px';
  }
});

// Add window resize listener to handle responsive behavior
window.addEventListener('resize', () => {
  if (isPopupVisible && activeItem) {
    // Re-position popup when window is resized
    showPopup(activeItem);
  }
});