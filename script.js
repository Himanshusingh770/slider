// Array of image filenames
const images = [
  "image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg",
  "image6.jpg", "image7.jpg", "image8.jpg", "image9.jpg", "image10.jpg",
  "image11.jpg", "image12.jpg",
];

let currentIndex = 0; // Tracks the current image index
let visibleDotCount = images.length; // Updated number of dots to display (set to 20)
let dotRangeStart = 0; // Starting index for the visible dots

// Dynamically generate gallery items
const gallery = document.querySelector('.gallery');
gallery.innerHTML = images.map((image, index) => 
  `<img src="./images/${image}" class="gallery-img" data-index="${index}" alt="Image ${index + 1}">`
).join('');

// Modal elements
const popupimage = document.getElementById("imageModal");
const selectpopupimage = document.getElementById("modalImage");
const imageDescription = document.querySelector(".caption");
const dotsContainer = document.querySelector(".dots");
const closeModalButton = document.querySelector(".close");  // Reference to the close button

// Function to open modal and show the clicked image
function openModal(index) {
  currentIndex = index;
  popupimage.style.display = "block";
  selectpopupimage.src = `./images/${images[index]}`;
  imageDescription.innerHTML = `Image ${index + 1}`;
  updateDots();
}

// Close modal when clicking the close button
closeModalButton.addEventListener("click", () => {
  popupimage.style.display = "none";
});

// Close modal when clicking outside the image
popupimage.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});


// Generate and update the visible dots (show exactly dots)
function updateDots() {
  dotsContainer.innerHTML = ''; // Clear previous dots

  for (let i = 0; i < visibleDotCount; i++) {
    const dotElement = document.createElement('span');
    dotElement.classList.add('dot');
    dotElement.dataset.index = i;
    dotElement.classList.toggle('active', i === currentIndex); // Highlight the active dot

    // Set the title attribute to show the image name as a tooltip
    dotElement.title = images[i];
    dotsContainer.appendChild(dotElement);
  }
}


// Add click event listeners to all gallery images
document.querySelectorAll(".gallery-img").forEach((img) => {
  img.addEventListener("click", (e) => {
    const index = e.target.getAttribute("data-index");
    openModal(parseInt(index));
  });
});

// Move to the previous image and adjust dots
document.querySelector(".arrow.left").addEventListener("click", () => {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
  openModal(currentIndex);
});

// Move to the next image and adjust dots
document.querySelector(".arrow.right").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  openModal(currentIndex);
});

// Dot navigation: Clicking on dots should show the corresponding image
dotsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("dot")) {
    const index = e.target.getAttribute("data-index");
    currentIndex = parseInt(index);

    // Show the corresponding image when a dot is clicked
    openModal(currentIndex);
  }
});

// Initialize the dots to display 20 at a time
updateDots();
