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
        url: url + `?email=${email}&&password=${password}`,
        type: 'GET',
        dataType: 'json'
      }).done((data) => {
        console.log(data);
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(data[0]));
        // Retrieve from localStorage
        const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));

        if (data[0].length === 0) {
          alert('User not found')
        } else {
          if (data[0].isAdmin !== true) {
            window.location.replace('../html/designer.html')
          } else {
            window.location.replace('../html/admin.html')
          }
        }
      })
    }
    return false;
  })
}
