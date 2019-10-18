$(document).ready(function () {
  $.ajax({
    url: " http://localhost:3000/designs",
    type: "GET",
    cache: true,
    success: function (data) {
      data.forEach((element, i) => {
        $('.container-content').append(
          `             
                  <div class="card-group col-md-3 mt-3">
                      <div class="card">
                          <img src="../myimages/${element.designUrl}.jpg" class="card-img-top" alt="..." width="280px" height="220px">
                          <div class="card-body">
                          <h5 class="card-title">${element.designName}</h5>
                          <p class="card-text">${element.designDescription}</p>
                          </div>
                          <div class="card-footer">
                          <small class="text-muted">${element.designPrice}</small>
                          </div>
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
                          <button type="button" class="btn btn-outline-light update-design-button" id=${element.id} data-toggle="modal" data-target="#update-form-modal">Update</button>
                          <button type="button" class="btn btn-outline-danger delete-design" id=${element.id}>Delete</button>
                      </div>
                  </td>
              </tr>
               `)

      });



      // search function

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
      $('button.delete-design').on('click', function (e) {
        $.ajax({
          url: `http://localhost:3000/designs/${e.target.id}`,
          type: "delete",
          success: function () {
            alert("deleted")
          }
        })
      })

      //Update button function
      $('button.update-design-button').on('click', function (e) {
        const id = e.target.id

        $('#update-design-name').val($('#' + id).children('td[id=design_name]').text())
        $('#update-design-price').val($('#' + id).children('td[id=design_price]').text())
        $('#update-design-desc').val($('#' + id).children('td[id=design_desc]').text())
        $('#update-design-url').val($('#' + id).children('td[id=design_url]').text())


        //window.localStorage.setItem("designupdate",JSON.stringify(designupdate_objs))
        // const designupdate_obj=JSON.parse(window.localStorage.getItem("designupdate"))

        $('#update-changes').on('click', function () {
          const designupdate_objs = {
            designName: $('#update-design-name').val(),
            designPrice: $('#update-design-price').val(),
            designDescription: $('#update-design-desc').val(),
            designUrl: $('#update-design-url').val()
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
});