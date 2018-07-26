var db = firebase.database(); 


  db.ref('data').once("value").then(function(data) {
    //Print out carousel items
      var items = data.val().carousel;

      for(var i in items){
        if(items[i] === 'nil') continue;
        else{
          var tmp = i;
          $('#homepage').append(`
          <figure id = "`+i+`">
              <a target = "_blank" href = `+items[i] +`><img src= "`+ items[i]+`"></a>
              <figcaption><button onclick= 'Delete("`+i+`" , "/carousel_delete")' >Delete</button></figcaption>
          </figure>`);
          $("#selection").append( ' <option  value="'+items[i].id+'" > '+i+'</option>');

        }
      }
      //Print out bookings
      var bookings = data.val().bookings;

      for (var key in bookings) {
        if (key === "nil" ) { continue; } 
        else{ 

          var obj = bookings[key];
          var prop_ = '';
          for (var prop in obj) {
            if(!obj.hasOwnProperty(prop) || obj[prop] == 'nil'){ 
              continue;
            }else if(prop == 'Date'){
              
              var new_prop = new Date(obj[prop]);
              new_prop = new_prop.toString();
              new_prop = new_prop.slice(0,15);
              $("#book").append('<p> <b>Date of Event</b>: '+new_prop+'</p>');
            }else if (prop == 'Timestamp' ){

              var new_prop = new Date(obj[prop]);
              new_prop = new_prop.toString();
              new_prop = new_prop.slice(0,15);
              $("#book").append('<p> <b>Time-Submitted</b>: '+new_prop+'</p>');
              
            }else{
              if(prop == 'Name'){
                prop_ = prop;
                $("#selection_b").append( ' <option  value="'+key+'" > '+obj[prop]+'</option>');
              }
              $("#book").append('<p> <b>'+prop+'</b>: '+obj[prop]+'</p>');
            }
          }
          $("#book").append(`<button onclick= 'Delete("`+key+`" , "/booking_delete")' >Delete</button>`);
          $("#book").append('</br>');
        }
      }
    //Printing out Prices
    var prices = data.val().pricing;
    for(var i in prices){
      var img = prices[i].img;
      var price = prices[i].price;
      if(i=== 'nil') continue; 

      else{
        $('#prices').append(`
        <figure>
          <a target = "_blank"href = `+img +`><img src= "`+img+`"> </a>
            <figcaption>`+i+`</figcaption>
            <figcaption>Price:`+price+`</figcaption>
            <button onclick= 'Delete("`+i+`" , "/pricing_delete")' >Delete</button>
        </figure>`);
      }
    }

    //Print out Portfolio Images
    var portfolio = data.val().portfolio;
    
    for(var i in portfolio){
      if(portfolio[i] === 'nil') continue;
      else{

        $('#portfolio').append(`
        <figure>
        <img src= "`+ portfolio[i].link+`"></a>
        <figcaption><button onclick= 'Delete("`+i+`" , "/portfolio_delete")' >Delete</button></figcaption>
        </figure>`);
      
      }
    }
  
  });

function Delete(item, url_){

  // alert('Are you sure You want to delete')
  document.getElementById('body').style.display = 'none';
  document.getElementById("loader").style.display = 'block';
  var data = {};
  data.val = item;
  $.ajax({
    type: 'POST',
    url: url_,
    data: JSON.stringify(data),
    contentType: 'application/json',
    cache: false,
    success: function (result) {
      location.reload();

  },
  error: function(result){
      alert("ERROR DELETING. "+ result);
      document.getElementById("loader").style.display = 'none';
      document.getElementById("homepage").style.display = 'block';
  }
});
}

function upload(item){

  // alert('Are you sure You want to delete')
  document.getElementById('body').style.display = 'none';
  document.getElementById("loader").style.display = 'block';
  var data = {};
  data.val = item;
  $.ajax({
    type: 'POST',
    url: 'upload',
    data: JSON.stringify(data),
    contentType: 'application/json',
    cache: false,
    success: function (result) {
      location.reload();

  },
  error: function(result){
      alert("ERROR UPLOADING: " + result);
      document.getElementById("loader").style.display = 'none';
      document.getElementById("homepage").style.display = 'block';
  }
});
}


function handleFiles(files, name) {
  if(files[0].size > 12582912){
    alert('File size too big!');
    document.getElementById(name).reset();
  }
}
