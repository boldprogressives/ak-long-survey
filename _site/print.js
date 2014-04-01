$(document).ready(function(){
  update_all();
  $("input, textarea").on("input", null, function(){ update_input($(this)); });
    $("input, textarea").on("keyup", null, function(){ update_input($(this)); });
  
});

function update_all(){
    $('textarea, input[type=text]').each(function(){
      var input_name = $(this).attr('name');
      var answer = $(this).val();
      console.log($('#print-'+input_name).length);
      if($('#print-'+input_name).length == 0){
      $('#print').find("[name="+input_name+"]").after('<span id="print-'+input_name+'">Your response: '+answer+'</span>');
      }
    });
}

function update_input(element){

    $('#print').find("#print-"+element.attr('name')).html('Your response: '+element.val()+'</span>');
}