$(document).ready(function () {
  $.ajax({
    url: `http://localhost:3000/designs`,
    type: "GET",
    success: function (data) {
      data.forEach((element, i) => {
        $("#myRow").append(`
        <div class="col-4 mt-5 mb-5">
        <img class="design image" src="../myimages/${element.designUrl}"/>
        <h1 class='text-capitalize font-weight-bold'>${element.designName}</h1>
        <p class='text-blue'>${element.designDescription}</p>
        <p>${element.designPrice}</p>
        <button data-toggle="modal" data-target="#booking-modal${element.id}" id="book-btn"class="btn btn-info btn-lg"">Book Design</button>

      
        <!-- booking modal -->

        <div class="modal fade" id="booking-modal${element.id}" tabindex="-1" role="
        dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Create New Design</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="create-dsn">
              <div class="form-group admin-email">
                <input id="book-design-name" type="text" class="form-control " placeholder="${element.designName}">
              </div>

              <div class="form-group admin-email">
                <input id="book-design-price" type="text" class="form-control " placeholder="${element.designPrice}">
              </div>
              <div class="form-group admin-email">
                <input id="book-design-desc" type="text" class="form-control " placeholder="${element.designDescription}">
              </div>
              <div class="form-group admin-email">
                <input id="book-design-url" type="text" class="form-control " placeholder="${element.designUrl}" disabled>
              </div>
              <div class="form-group admin-email">
                <input id="book-design-id" type="text" class="form-control "   value="${element.id}" disabled>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-lg btn-danger" data-dismiss="modal">Close</button>
            <button type="button"  class="btn btn-lg btn-dark save-booking">Save Booking</button>
          </div>
        </div>
      </div>
    </div>
        </div>
        
      `
        )

        $('tbody').append(`
         <tr id=${element.id}>
            <th scope="row">${i + 1}</th>
            <td id="design_name">${element.designName}</td>
            <td id="design_id">${element.designerId}</td>
            <td id="design_desc">${element.designDescription}</td>
            <td id="design_price">${element.designPrice}</td>
            <td id="design_url">${element.designUrl}</td>
            <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-outline-light update-design-button" id=${element.id} data-toggle="modal" data-target="#update-form-modal" style="padding:5px;">Update</button>
                    <button type="button" class="btn btn-outline-danger delete-design" id=${element.id} style="padding:5px;">Delete</button>
                </div>
            </td>
        </tr>
         `)

      });
      //search function
      $('#search-button').click(function (e) {
        e.preventDefault();
        const desName = $("#search-box").val().trim();
        console.log(desName);

        $.ajax({
          type: "GET",
          url: `http://localhost:3000/designs?designerId=${designerId}&designName_like=${desName}`,
          dataType: "json",
          success: function (designs) {
            designs.forEach((design, i) => {
              $('tbody').html(`
        <tr id=${design.id}>
           <th scope="row">${i + 1}</th>
           <td id="design_name">${design.designName}</td>
           <td id="design_desc">${design.designDescription}</td>
           <td id="design_price">${design.designPrice}</td>
           <td id="design_url">${design.designUrl}</td>
           <td>
               <div class="btn-group" role="group" aria-label="Basic example">
                   <button type="button" class="btn btn-outline-light update-design-button" id=${design.id} data-toggle="modal" data-target="#update-form-modal">Update</button>
                   <button type="button" class="btn btn-outline-danger delete-design" id=${design.id}>Delete</button>
               </div>
           </td>
       </tr>
        `)

            })

          },
          error: function (error) {
            alert('An error occured');
          }
        })
      });

      //When the field is empty
      $('#search-box').on('keyup', function (e) {
        if (e.target.value === '') {
          const designer = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
          const designerId = designer["id"];
          $.ajax({
            url: `http://localhost:3000/designs`,
            success: function (data) {
              //$('tbody').html('');
              data.forEach((element, i) => {
                $('tbody').append(`
            <tr id=${element.id}>
              <th scope="row">${i + 1}</th>
              <td id="design_name">${element.designName}</td>
              <td id="design_desc">${element.designDescription}</td>
              <td id="design_price">${element.designPrice}</td>
              <td id="design_url">${element.designUrl}</td>
              <td>
                  <div class="btn-group" role="group" aria-label="Basic example">
                      <button type="button" class="btn btn-outline-light update-design-button" id=${element.id} data-toggle="modal" data-target="#update-form-modal">Update</button>
                      <button type="button" class="btn btn-outline-danger delete-design" id=${element.id}>Delete</button>
                  </div>
              </td>
            </tr>
          `)
              })
            }
          })
        }
      });


      // Delete button function
      $('button.delete-design').on('click', function (e) {
        alert('clicked')
        $.ajax({
          url: `http://localhost:3000/designs/${e.target.id}`,
          type: "delete",
          success: function () {
            alert("deleted");
          }
        })
      })

      //booking function
      $('.save-booking').click(function (e) {
        e.preventDefault();
        const designName = $('#book-design-name').attr('placeholder');
        const designPrice = $('#book-design-price').attr('placeholder');
        const designDescription = $('#book-design-desc').attr('placeholder');
        const designUrl = $('#book-design-url').attr('placeholder');
        const designid = $('#book-design-id').attr('value');
        const bookData = { designName, designPrice, designDescription, designUrl, designid };

        console.log(bookData);


        $.ajax({
          url: 'http://localhost:3000/bookings',
          type: "POST",
          data: bookData,
          success: function (data) {
            alert("Successful")
          },
          error: function (error) {
            alert("there was an error");
          }
        })
      }
      )



      //Update button function
      $('button.update-design-button').on('click', function (e) {
        const id = e.target.id;
        const designer = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
        const designerId = designer["id"];

        $('#update-design-name').val($('#' + id).children('td[id=design_name]').text())
        $('#update-design-price').val($('#' + id).children('td[id=design_price]').text())
        $('#update-design-desc').val($('#' + id).children('td[id=design_desc]').text())
        $('#update-design-url').val($('#' + id).children('td[id=design_url]').text())



        $('#update-changes').on('click', function () {
          const designupdate_objs = {
            designName: $('#update-design-name').val(),
            designPrice: $('#update-design-price').val(),
            designDescription: $('#update-design-desc').val(),
            designUrl: $('#update-design-url').val(),
            designerId: designerId

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
  })
})