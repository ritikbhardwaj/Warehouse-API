let URI = 'http://minor-project-api.herokuapp.com';
//DOM loaded
$(document).ready(() => {
	$('.error').hide();
	//'Show password' logic
	const show_passwd = $('div#show_password input');
	show_passwd.click(() => {
		if ($(show_passwd).prop('checked') === true) {
			$('div#form input#password').attr('type', 'text');
		} else if ($(show_passwd).prop('checked') === false) {
			$('div#form input#password').attr('type', 'password');
		}
	});

	//Submit button logic
	$('#btn-submit').click(() => {
		//data from the form
		var email = $('input#email').val();
		var password = $('input#password').val();

		var userData = {
			email,
			password,
		};
		//reference to the form message container
		// const form_message = $("div#form-message");

		//fetch
		fetch(URI + '/api/auth/login', {
			method: 'POST', // or 'PUT'
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					$('.error').hide();
					$('.error').slideDown('slow');
					$('.error').html(`${data.message}`);
				} else {
					$('.error').hide();
					// similar behavior as an HTTP redirect
					window.location.replace(URI + '/console');
				}
			})
			.catch((error) => {
				$('.error').hide();
				$('.error').slideDown('slow');
				$('.error').html(`${error}`);
			});
	});
});
