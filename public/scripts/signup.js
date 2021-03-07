//DOM loaded
$(document).ready(() => {
	$('.error').hide();
	//data from the form
	let userData = {
		username: {},
	};

	const agree = $('div#agree input');
	$('#re-password').keyup(function () {
		if ($('input#password').val() == $('input#re-password').val()) {
			$('button#btn-submit').prop('disabled', false);
			$('button#btn-submit').addClass('enabled');
		} else {
			$('button#btn-submit').prop('disabled', true);
			$('button#btn-submit').removeClass('enabled');
		}
	});

	//Submit button logic
	$('#btn-submit').click(() => {
		userData.username.firstName = $('input#firstname').val();
		userData.username.lastName = $('input#lastname').val();
		userData.email = $('input#email').val();
		userData.password = $('input#password').val();

		fetch('https://minor-project-api.herokuapp.com/api/auth/signup', {
			method: 'POST', // or 'PUT'
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					$('.error').slideDown('slow');
					$('.error').html(`${data.message}`);
				} else {
					$('.error').hide();
					// similar behavior as an HTTP redirect
					window.location.replace(
						'https://minor-project-api.herokuapp.com/'
					);
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	});
});
