$(document).ready(function () {
  






  $('#booking').on('click', function (e) {
    e.preventDefault();
    const firstName = $('#email').val();
    const lastName = $('#email').val();
    const email = $('#email').val();
    if (firstName.length = "" || firstName.length > 1) {
      alert('Please enter Your first name');
    } else if (lastName.length = "" || firstName.length > 1) {
      alert('Please enter Your last name');
    } else if (email.length = "") {
      alert('Please enterYour email');
    }

  })
})