$(document).ready(function(){
  
  $('.next-btn').click(function(){
    var current_slide = $('#survey-steps').data("bs.carousel").getActiveIndex();
    $("#survey-steps .carousel-indicators li").each(function(i){
      if(i == current_slide){
        $(this).attr("data-slide-to", current_slide);
        $(this).addClass("prog-complete");
      }
    });
    $("#survey-steps").carousel("next");
  });
  
    $(".prev-btn").click(function(){
    $('#survey-steps').carousel('prev');
  });
  
  
});