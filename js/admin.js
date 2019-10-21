$(document).ready(function () {
  $.ajax({
    url: `http://localhost:3000/designs`,
    type: "GET",
    cache: true,
    success: function (data) {
      data.forEach((element, i) => {
        $('.container-content').append(
          `             
            
                <div class="card col-md-4 ">
                    <img src="../myimages/${element.designUrl}" class="card-img-top" alt="..." width="280px" height="220px">
                    <div class="card-body">
                    <h5 class="card-title">${element.designName}</h5>
                    <p class="card-text">${element.designDescription}</p>
                    </div>
                    <div class="card-footer">
                    <small class="text-muted">${element.designPrice}</small>
                    <a href="booking.html" class="btn btn-primary stretched-link">Book Design</a>
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
                    <button type="button" class="btn btn-outline-light update-design-button" id=${element.id} data-toggle="modal" data-target="#update-form-modal">Update</button>
                    <button type="button" class="btn btn-outline-danger delete-design" id=${element.id}>Delete</button>
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
              $('tbody').html('');
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
        $.ajax({
          url: `http://localhost:3000/designs`,
          type: "delete",
          success: function () {
            alert("deleted");
          }
        })
      })

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
            designerId

          }

          $.ajax({
            url: `http://localhost:3000/designs`,
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