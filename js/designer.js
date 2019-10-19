$(document).ready(function () {
  const designer = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
  const designerIdVal = designer["id"]
  $.ajax({
    url: "http://localhost:3000/designs",
    type: 'GET',
    success: function (data) {
      data.filter(data => data.designerId == designerIdVal);
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
      });
    }
  })
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