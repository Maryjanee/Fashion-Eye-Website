$(document).ready(function () {
  $.ajax({
    url: " http://localhost:3000/designs",
    type: "GET",
    cache: true,
    success: function (data) {
      data.forEach(element => {

        $('.container-content').append(
          `
              <div class="card content">
                 <img src="../img/designs/${element.designUrl}.jpg" class="card-img-top" alt="images" />
                  <div class="card-body">
                      <h5 class="card-title">${element.designName}</h5>
                      <p class="card-text">${element.designDescription}</p>
                      <p class="card-text">${element.designPrice}</p>
                      <a href="#" class="btn btn-primary">Update</a>
                      <a href="#" class="btn btn-primary">Delete</a>
                  </div>
           </div>
           `
        )

      });
    }
  });
});