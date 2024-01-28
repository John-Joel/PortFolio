function menuOpener() {
    var liList = document.querySelectorAll('.fn_sidebar_header ul.vert_nav li');
    var Open = document.querySelector('.fn_header .hamburger');
    var Closer = document.querySelector('.fn_sidebar_header .closer');
    var wrapper = document.querySelector('.fn_wrapper');

function handleToggle() {
    if (Open.classList.contains('is-active')) {
        Open.classList.remove('is-active');
        Closer.classList.remove('is-active');
        wrapper.classList.remove('opened');
    } else {
        Open.classList.add('is-active');
        Closer.classList.add('is-active');
        wrapper.classList.add('opened');
    }
}

function handleClose() {
    if (Closer.classList.contains('is-active')) {
        console.log("Close - yes");
        Closer.classList.remove('is-active');
        Open.classList.remove('is-active');
        wrapper.classList.remove('opened');
    } else {
        console.log("Close - No");
        Closer.classList.add('is-active');
        Open.classList.add('is-active');
        wrapper.classList.add('opened');
    }
}

// Adding event listeners
Open.addEventListener('click', handleToggle);
Closer.addEventListener('click', handleClose);
    // Clearing the timeout if any
    clearTimeout();
    
    // Adding the class 'fn_ready' to each li element with a delay
    liList.forEach(function(li, index) {
        setTimeout(function() {
            li.classList.add('fn_ready');
        }, index * 100 + 300);
    });
}

// Call the function to enable menu opener functionality
menuOpener();

function contactForm() {
    document.querySelector('.fn_contact_sendbtn').addEventListener('click', function() {
        var contactForm = this.closest('.fn_contact_form');
        var name = contactForm.querySelector('.name').value;
        var email = contactForm.querySelector('.email').value;
        var message = contactForm.querySelector('.message').value;
        var returnMess = contactForm.querySelector('.returnmessage');
        var success = returnMess.getAttribute('data-success');

        returnMess.innerHTML = '';

        if (name === '' || email === '' || message === '') {
            contactForm.querySelector('.empty_notice').style.display = 'block';
            setTimeout(function() {
                contactForm.querySelector('.empty_notice').style.display = 'none';
            }, 2000);
        } else {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'modal/contact.php', true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    returnMess.innerHTML = xhr.responseText;

                    if (returnMess.querySelector('span.contact_error')) {
                        returnMess.style.display = 'block';
                        setTimeout(function() {
                            returnMess.style.display = 'none';
                        }, 2000);
                    } else {
                        returnMess.innerHTML = "<span class='contact_success'>" + success + "</span>";
                        returnMess.style.display = 'block';
                        setTimeout(function() {
                            returnMess.style.display = 'none';
                        }, 4000);
                    }

                    if (xhr.responseText === '') {
                        contactForm.reset(); // To reset form fields on success
                    }
                }
            };

            xhr.send('xx_name=' + name + '&xx_email=' + email + '&xx_message=' + message);
        }

        return false;
    });
}

// Call the function to enable contact form functionality
contactForm();