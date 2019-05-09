var createuserInput = function() {
   return new Promise( function( res,rej) {
     $('body>div').empty();
     $('<input type="text">').appendTo('body>div');
     $('<button>')
     .html('Login')
     .appendTo('body>div')
     .on('click', function(){
       var eingabe = $('input').val();

       console.log( eingabe );


       if(eingabe != ''){
         res(eingabe);

       }else{
         rej();
       }

     })
   })
}
var postUserName = function( username  ){
  return new Promise(function(res,rej){
    $.ajax({
      url:'http://localhost:8888/user',
      method:'post',
      data:{u:username},
    /*  success:res,
      error:rej*/
    }).done( res ).fall(rej);
  });
}
$(document).ready(function(){
  createuserInput()
  .then(postUserName)
  .then(console.log)
  .catch( function(){ $('input').addClass('error')})
})
