
// Load sections
const slides = document.querySelectorAll("section[data-slide]");
slides.forEach((slide, index) => {
    slideName = slide.getAttribute("data-slide");
    fetch('./src/' + slideName + '.html')
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Network response was not ok.');
        })
        .then(html => {
            slide.innerHTML = html;
            // Check if the body element has the class 'loaded'
            if (!document.body.classList.contains('loaded')) {
                // If the class 'loaded' is not present, add it
                document.body.classList.add('loaded');
                document.documentElement.style.opacity = 1; // Fade in the HTML content
            }

            // Link elements to slides using data-go-slide attribute
            const linksASlides = document.querySelectorAll('[data-go-slide]');
            linksASlides.forEach(link => link.addEventListener('click', () => {
                slideArguments = link.getAttribute('data-go-slide').split(',');
                Reveal.slide(slideArguments[0], slideArguments[1]);
            }))


        })
        .catch(error => console.error('Error loading HTML:', error));

})

// Menu toggle
// Select all elements with data-ui="open"
const elements = document.querySelectorAll('[data-ui="open"]');
// Iterate over each selected element and attach a click event listener
elements.forEach(element => {
    element.addEventListener('click', function () {
        // Toggle the 'active' class on the clicked element
        if (this.classList.contains('active')) {
            this.classList.remove('active');
        } else {
            this.classList.add('active');
        }
    });
});

