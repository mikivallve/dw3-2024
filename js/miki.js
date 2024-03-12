
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

            // Send Email  
            if (document.getElementById('emailForm')) {
                sendEmail()
            }

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


// Form API
function sendEmail() {


    document.getElementById('emailForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const fromEmail = document.getElementById('fromEmail').value;
        const toEmail = document.getElementById('toEmail').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        fetch("https://api.mailersend.com/v1/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "Authorization": "Bearer mlsn.703b54c1f7735ec1d201f097d2246f7c995cbe30bd7b8781bdb8f12ff6af22b0"
            },
            body: JSON.stringify({
                from: { email: fromEmail },
                to: [{ email: toEmail }],
                subject: subject,
                text: message,
                html: message
            })
        })
            .then(response => {
                if (response.ok) {
                    alert("Email sent successfully!");
                } else {
                    throw new Error('Failed to send email');
                }
            })
            .catch(error => {
                console.error(error);
                alert("An error occurred while sending the email.");
            });
    });
}