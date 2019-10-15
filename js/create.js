//function createDesign(e) {
$(document).ready(function () {
  $('#create-btn').on('click', function (e) {
    e.preventDefault();

    const designName = $('#design-name').val();
    const designPrice = $('#design-price').val();
    const designDescription = $('#design-desc').val();
    const designUrl = $('#design-url').val();
    const designer = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
    const designerId = designer["id"];
    const url = $(this).attr('action');


    const designValues = { designName, designPrice, designDescription, designUrl, designerId };
    console.log(designValues);
    if (designName.length < 3) {
      alert("Please enter your design name");
    } else if (designPrice.length < 3) {
      alert("Please enter the price for the design");
    } else if (designDescription.length < 3) {
      alert("Please enter a description for the design");
    } else if (designUrl.length < 3) {
      alert("A url to the design image must be given");
    } else {
      $.ajax({
        url: 'http://localhost:3000/designs',
        type: "POST",
        data: designValues,
        success: function (data) {
          alert("success");
        },
        error: function (error) {
          alert("there was an error");
        }
      });
    }
    return false;
  })

})





