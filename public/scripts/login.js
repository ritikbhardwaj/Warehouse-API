//DOM loaded
$(document).ready(() => {
  //'Show password' logic
  const show_passwd = $("div#show_password input");
  show_passwd.click(() => {
    if ($(show_passwd).prop("checked") === true) {
      $("div#form input#password").attr("type", "text");
    } else if ($(show_passwd).prop("checked") === false) {
      $("div#form input#password").attr("type", "password");
    }
  });

  //Submit button logic
  $("#btn-submit").click(() => {
    //data from the form
    var user = $("input#email").val();
    var pass = $("input#password").val();

    var userData = {
      username: user,
      password: pass
    };
    //reference to the form message container
    // const form_message = $("div#form-message");

    //fetch
    let data = { email: userData.username,password: userData.password };

    fetch('http://localhost:3000/api/auth/login', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
      .then(data => {
        console.log(data);
      if (data.authenticated) { 
        // similar behavior as an HTTP redirect
        window.location.replace("http://localhost:3000/console");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });  
      
  });
});