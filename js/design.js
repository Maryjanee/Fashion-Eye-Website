$(document).ready(function () {
  $.ajax({
    url: " http://localhost:3000/designs",
    type: "GET",
    cache: true,
    success: function (data) {
      data.forEach((element, i) => {
        $('.container-content').append(
          `
              <div class="card content">
                 <img src="../img/desgin_img/${element.designUrl}.jpg" class="card-img-top" alt="images" />
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

        $('tbody').append(`
               <tr id=${element.id}>
                  <th scope="row">${i + 1}</th>
                  <td id="design_name">${element.designName}</td>
                  <td id="design_desc">${element.designDescription}</td>
                  <td id="design_price">${element.designPrice}</td>
                  <td id="design_url">${element.designUrl}</td>
                  <td>
                      <div class="btn-group" role="group" aria-label="Basic example">
                          <button type="button" class="btn btn-outline-light" id=${element.id} data-toggle="modal" data-target="#update-form-modal">Update</button>
                          <button type="button" class="btn btn-outline-danger" id=${element.id}>Delete</button>
                      </div>
                  </td>
              </tr>
               `)

      });




      $('#search-form').submit(function (e) {
        e.preventDefault();
        const imgUrl = $("#search-box").val();

        $.ajax({
          type: "GET",
          url: `http://localhost:3000/designs/?designUrl=${imgUrl}`,
          dataType: "json",
          success: function (data) {
            $('tbody').replaceWith(`
            <tr id=${data[0].id}>
               <th scope="row">${1}</th>
               <td id="design_name">${data[0].designName}</td>
               <td id="design_desc">${data[0].designDescription}</td>
               <td id="design_price">${data[0].designPrice}</td>
               <td id="design_url">${data[0].designUrl}</td>
               <td>
                   <div class="btn-group" role="group" aria-label="Basic example">
                       <button type="button" class="btn btn-outline-light" id=${data[0].id} data-toggle="modal" data-target="#update-form-modal">Update</button>
                       <button type="button" class="btn btn-outline-danger" id=${data[0].id}>Delete</button>
                   </div>
               </td>
           </tr>
            `)

          }
        })
      });



      // Delete button function
      $('button.btn-outline-danger').on('click', function (e) {
        $.ajax({
          url: `http://localhost:3000/designs/${e.target.id}`,
          type: "delete",
          success: function () {
            alert("deleted")
          }
        })
      })

      //Update button function
      $('button.btn-outline-light').on('click', function (e) {
        const id = e.target.id

        $('#design-name').val($('#' + id).children('td[id=design_name]').text())
        $('#design-price').val($('#' + id).children('td[id=design_price]').text())
        $('#design-desc').val($('#' + id).children('td[id=design_desc]').text())
        $('#design-url').val($('#' + id).children('td[id=design_url]').text())


        //window.localStorage.setItem("designupdate",JSON.stringify(designupdate_objs))
        // const designupdate_obj=JSON.parse(window.localStorage.getItem("designupdate"))

        $('#update-changes').on('click', function () {
          const designupdate_objs = {
            designName: $('#design-name').val(),
            designPrice: $('#design-price').val(),
            designDescription: $('#design-desc').val(),
            designUrl: $('#design-url').val()
          }

          $.ajax({
            url: `http://localhost:3000/designs/${e.target.id}`,
            type: "put",
            data: designupdate_objs,
            success: function () {
              alert("Successful changes")
            }
          })
        })
      })
    }
  });

  // http://localhost:3000/designs?designUrl=m5






});