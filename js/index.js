$(document).ready(function() {
  $.ajax({
    url: 'file:///home/vmuser/test/fixtures/seriea.json',
    type: 'GET',
    dataType: "jsonp",
    crossDomain: true,
    jsonp: false,
    //converts: 'text json',
    processData: false,
    //contentType: "application/x-www-form-urlencoded",
    //headers: "X-Requested-With:XMLHttpRequest",
    success: function(data) {
      console.log('-=-=-=-data-=-=-=-', data);
    }
  });
  //$.getJSON('seriea.json', function( result ) {
  //  console.log(result);
  //});
});