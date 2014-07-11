$(document).ready(function(){
  
  window.PCCC = window.PCCC || {};
  PCCC.survey = PCCC.survey || {};

  var guid = (function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
    }
    return function() {
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
    };
  })();

  function getSurveyIdentifiers() {
    return {"survey_token": $("form input[name=action_survey_token]").val(),
            "akid": $("form input[name=akid]").val(),
            "action_id": $("form input[name=action_id]").val()
           };
  }

  function getSurveyToken() {
    return $("form input[name=action_survey_token]").val(); 
  }
  function makeSurveyToken() {
    $("form input[name=action_survey_token]").val(guid()); 
  }

  PCCC.survey.getSurveyData = function() {
    var data = getSurveyIdentifiers();
    if( !data.survey_token && !data.akid && !data.action_id ) {
      return;
    }

    var url = window.location.origin + window.location.pathname 
              + window.location.search + "&template_set=longsurvey";

    $.getJSON(url, function(resp) {
      if( resp.status == 400 ) {
        window.location = window.location.origin + window.location.pathname;
        return;
      }
      var lastFilledInput;
      $("form :input[name]").each(function() {
        var name = $(this).attr("name"), value;
        if( !name ) { return; }
        if( name.substr(0, 7) === "action_" ) {
          name = name.substr(7);
          value = resp.action[name];
        } else {
          value = resp[name];
        }
        if( value && value.trim() ) {
          
          var $el = $(this), type = $el.attr("type");
          switch(type) {
            case 'checkbox':
              $el.attr('checked', 'checked');
              break;
            case 'radio':
              $el.filter('[value="'+value+'"]').attr('checked', 'checked');
              break;
            default:
              $el.val(value);
          }
          lastFilledInput = $el;
        }
      });

      if( lastFilledInput ) {
        $(".item, .ak-progress").removeClass("active");
        var activeSlide = lastFilledInput.closest(".item"),
            idx = activeSlide.index();
        activeSlide.addClass("active");
        $($(".ak-progress").get(idx)).addClass("active").addClass("prog-complete")
           .prevAll().addClass("prog-complete");
      }
    });
  }

  $('.next-btn').click(function() {

    if( getSurveyToken() ) {
      $.post("/update_action/", $("form").serialize());
    } else {
      makeSurveyToken();      
      $.post("/rest/v1/action/", $("form").serialize(), function(resp) { 
        var qs = "akid=" + resp.akid + "&action_id="
                  + resp.id + "&survey_token=" + resp.fields.survey_token;
        window.location = window.location.origin + window.location.pathname + "?" + qs;
      });
    }

    var current_slide = $('#survey-steps').data("bs.carousel").getActiveIndex();
    $("#survey-steps .carousel-indicators li").each(function(i) {
      if(i == current_slide){
        $(this).addClass("prog-complete");
      }
    });
    $("#survey-steps").carousel("next");
  });
  
  $(".prev-btn").click(function(){
    $('#survey-steps').carousel('prev');
  });

  $("#survey-steps .carousel-indicators li").each(function(i) {
    $(this).attr("data-slide-to", i);
  });
  
  PCCC.survey.getSurveyData();
  
});
