$(document).ready(function() {
  $('button').click(function(e) {
    var data = $('form').serializeArray();
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      localStorage.setItem(data[i]['name'], data[i]['value']);
    }
  });
  // $('#contact-billing').submit(function(e) {
  //   var data = $('#contact-billing').serializeArray();
  //   console.log(data);
  //   for (var i = 0; i < data.length; i++) {
  //     localStorage.setItem(data[i]['name'], data[i]['value']);
  //   }
  // });
});
