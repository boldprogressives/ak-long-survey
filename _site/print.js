$(document).ready(function(){
  update_inputs();
  $(document).on("input", "input, textarea", null, function(){ update_inputs(); });
    $(document).on("keyup", "input, textarea", null, function(){ update_inputs(); });
  
});

function update_inputs(){
    console.log('update!');
    $('textarea, input').each(function(){
      var input_name = $(this).attr('name');
        var answer = $(this).val();
        if($(".print-"+input_name).length > 0){
            $(".print-"+input_name).html(answer);
        } else {
            $('#print').find("[name="+input_name+"]").after('<span class="print-'+input_name+'">Your response: '+answer+'</span>');
        }
    });
}