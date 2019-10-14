function loginUser() {
  $('#login-form').submit(function (e) {
    e.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();
    const url = $(this).attr('action');
    if (email.length < 1) {
      alert("Please enter your email address");
    } else if (password.length < 1) {
      alert("Please enter your password");
    } else {
      $.ajax({
        url: url + `/?email=${email}&&password=${password}`,
        type: 'GET',
        dataType: 'json'
      }).done((data) => {
        console.log(data)
        if (data.length === 0) {
          alert('User login credentials incorrect')
        } else {
          if (data.isAdmin !== true) {
            window.location.replace('../html/designs.html')
          } else {
            window.location.replace('../html/admin.html')
          }
        }
      })
    }
    return false;
  })
}
