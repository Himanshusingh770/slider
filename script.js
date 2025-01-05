document.addEventListener("DOMContentLoaded", function() {
    const images = [
        "image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg",
        "image6.jpg", "image7.jpg", "image8.jpg", "image9.jpg", "image10.jpg",
        "image11.jpg", "image12.jpg",
    ];

    let currentIndex = 0;
    const gallery = document.querySelector('.gallery');
    const popupImage = document.getElementById("imageModal");
    const slider = document.querySelector('.slider');
    const imageDescription = document.querySelector(".caption");
    const dotsContainer = document.querySelector(".dots");
    const closeModalButton = document.querySelector(".close");
    const leftArrow = document.querySelector(".arrow.left");
    const rightArrow = document.querySelector(".arrow.right");

    // Dynamically generate gallery items
    gallery.innerHTML = images.map((image, index) => 
        `<img src="./images/${image}" class="gallery-img" data-index="${index}" alt="Image ${index + 1}">`
    ).join('');

    // Initialize the slider and populate it with images
    slider.innerHTML = images.map((image, index) => 
        `<img src="./images/${image}" class="slider-img" alt="Image ${index + 1}">`
    ).join('');

    // Function to open modal and show the clicked image
    function openModal(index) {
        currentIndex = index;
        popupImage.style.display = "block";
        updateSliderPosition();
        updateDots();
        updateImageDescription();
        updateArrows();
    }

    // Close modal when clicking the close button
    if (closeModalButton) {
        closeModalButton.addEventListener("click", (e) => {
            e.stopPropagation();
            popupImage.style.display = "none";
        });
    }

    // Close modal when clicking outside the image
    popupImage.addEventListener("click", (e) => {
        if (e.target === popupImage) {
            popupImage.style.display = "none";
        }
    });

    // Update the slider position
    function updateSliderPosition() {
        const offset = currentIndex * -100; // Move the slider left or right
        slider.style.transform = `translateX(${offset}%)`;
    }

    // Update the image description with the image name
    function updateImageDescription() {
        const currentImageName = images[currentIndex];
        imageDescription.innerHTML = currentImageName;
    }

    // Generate and update the visible dots
    function updateDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < images.length; i++) {
            const dotElement = document.createElement('span');
            dotElement.classList.add('dot');
            dotElement.dataset.index = i;
            dotElement.classList.toggle('active', i === currentIndex);
            dotElement.title = `Image ${i + 1}`;
            dotsContainer.appendChild(dotElement);
        }
    }

    // Disable or enable arrows based on current index
    function updateArrows() {
        if (currentIndex === 0) {
            leftArrow.classList.add("disabled");
        } else {
            leftArrow.classList.remove("disabled");
        }

        if (currentIndex === images.length - 1) {
            rightArrow.classList.add("disabled");
        } else {
            rightArrow.classList.remove("disabled");
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
    leftArrow.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
            updateDots();
            updateImageDescription();
            updateArrows();
        }
    });

    // Move to the next image and adjust dots
    rightArrow.addEventListener("click", () => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateSliderPosition();
            updateDots();
            updateImageDescription();
            updateArrows();
        }
    });

    // Dot navigation: Clicking on dots should show the corresponding image
    dotsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("dot")) {
            const index = e.target.getAttribute("data-index");
            currentIndex = parseInt(index);
            updateSliderPosition();
            updateDots();
            updateImageDescription();
            updateArrows();
        }
    });

    // Initialize the dots, arrows, and slider position
    updateDots();
    updateSliderPosition();
    updateArrows();
});
