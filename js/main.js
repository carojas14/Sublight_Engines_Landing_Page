(() => {

    window.addEventListener('DOMContentLoaded', (e) => {

        //----- Burger button -----//
        let menu = document.getElementsByClassName("burger_menu")[0],
            navLinks = document.getElementsByClassName("hidden_menu")[0];
        menu.onclick = function () {
            menu.classList.toggle("active");
            navLinks.classList.toggle("active");
        };


        //----- Form Validation -----//
        let form = document.querySelector('[data-js-form]'),
            submit = form.querySelector('[data-submit]'),
            nameRegex = /^[a-zA-Z\s]+$/,
            emailRegex = /(.+)@(.+){1,}\.(.+){1,}/,
            phoneRegex = /^\d{1}\(\d{3}\)\s?\d{3}-\d{4}$/;

        submit.addEventListener("click", () => {
            let validation = valideForm(form);

            if (validation) {
                alert("Thanks for getting in touch. We'll be in contact soon!")

                // let SERVICE_ID = 'default_service',
                //     TEMPLATE_ID = 'template_iizd2hm',
                //     templateParams = {
                //         to_name: nameCustomer,
                //         from_name: 'Sublight Engines',
                //         message: 'Thanks for getting in touch.',
                //         to_email: email
                //     };

                // emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
                //     .then(function(response) {
                //         console.log('SUCCESS!', response.status, response.text);
                //     }, function(error) {
                //         console.log('FAILED...', error);
                //     });
            }

        });

        valideForm = (form) => {

            let isValid = true;
            let to_name = ''
            let to_email = ''
            let to_phone = ''

            let data = form.querySelectorAll('[data-field]');


            for (let i = 0, l = data.length; i < l; i++) {

                let message = data[i].nextElementSibling;

                //---- No empty fields ------//

                if (data[i].required && data[i].value == '') {
                    message.textContent = 'This field is required';
                    isValid = false;
                }
                else {
                    message.textContent = ''
                }

                //---- name validation ------//

                if (data[i].name == 'name') {
                    if (data[i].value != '') {
                        let nameCustomer = data[i].value;
                            to_name = nameCustomer;

                        if (nameRegex.test(nameCustomer)) {
                            message.textContent = ''
                        }
                        else {
                            message.textContent = 'Not a valid name';
                            isValid = false;
                        }
                    }
                }

                //---- email validation ------//

                if (data[i].name == 'email') {
                    if (data[i].value != '') {
                        let email = data[i].value;
                        to_email = email;

                        if (emailRegex.test(email)) {
                            message.textContent = ''
                        }
                        else {
                            message.textContent = 'Not a valid email';
                            isValid = false;
                        }
                    }
                }

                //---- phone validation ------//

                if (data[i].name == 'phone') {
                    if (data[i].value != '') {
                        let phone = data[i].value;
                        to_phone = phone;

                        if (phoneRegex.test(phone)) {
                            message.textContent = ''
                        }
                        else {
                            message.textContent = 'Not a valid phone';
                            isValid = false;
                        }
                    }
                }

                //---- language validation ------//

                if (data[i].name == 'language') {
                    if (data[i].value != '') {
                        let language = data[i].value;
                        message.textContent = ''
                    }
                    else {
                        message.textContent = 'Please select a language';
                        isValid = false;
                    }
                }
            }

            let SERVICE_ID = 'default_service',
                TEMPLATE_ID = 'template_iizd2hm',
                templateParams = {
                    to_name,
                    from_name: 'Sublight Engines',
                    message: 'Thanks for getting in touch on Sublight Engines. We are excited to have you on board and will be happy to help you. We will contact you soon at',
                    to_phone,
                    to_email
                };

            emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
                console.log('FAILED...', error);
            });

            return isValid;

        }


    });
})();