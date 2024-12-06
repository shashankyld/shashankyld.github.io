// Get all timeline items
const timelineItems = document.querySelectorAll('li');

// Get the popup element and caption container
const popup = document.getElementById('popup');
const popupImage = document.getElementById('popup-image');
const popupCaption = document.getElementById('popup-caption');

// Add hover event listener for each item
timelineItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    // Get the image URL and caption from the data attributes
    const imageUrl = item.getAttribute('data-image');
    const captionText = item.getAttribute('data-caption');
    
    if (imageUrl) {  // Check if an image URL is provided
      popupImage.src = imageUrl;  // Set the source of the image in the popup
      popupCaption.textContent = captionText;  // Set the caption text
      popup.style.right = '20px';  // Move the pop-up to the right side of the screen
    }
  });
  
  // Hide the pop-up when mouse leaves
  item.addEventListener('mouseleave', () => {
    popup.style.right = '-300px';  // Move the pop-up completely off-screen to the left
  });
});
