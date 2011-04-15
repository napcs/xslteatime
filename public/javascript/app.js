$(function(){
  
  $("#help").hide();
  
  $("a#help_link").click(function(e){
    e.preventDefault();
    $("#help").dialog({
      bgiframe: true,
      width: 700,
      modal: true,
      autoOpen: true
    });
  });

  $('#xslteatime_form').submit(function(event){
    event.preventDefault(); 
    transformViaAjax();

  });
  
  var $xmleditor = CodeMirror.fromTextArea(document.getElementById("code"), {
  });

  var $xslteditor = CodeMirror.fromTextArea(document.getElementById("xslt"), {
  });
  
  var transformViaAjax = function(){
    $("#output").html("I got this.... hold on a sec..");
     
    $xmleditor.save();  
    $xslteditor.save();
    
    $.ajax({
      type: "POST",
      url: "/",
      dataType: 'json',
      data: $("#xslteatime_form").serialize(),
      success: function(data){
        if(data["errors"]){
          $('#output').html("<h2>There were errors with your input</h2>" + data['errors']);
          $('#output_source').val("There were errors with your input - " + data['errors']);
          
        }else{
          $('#output').html(data["render"]);
          $('#output_source').val(data["render"]);
        }  
      },
      failure: function(){
        $('#output').html("The connection to the server failed.");
      }
    });
  
  }

  myLayout = $('body').layout({

    applyDefaultStyles: true,
    west__size: "400",
    north__size: "80",
    south__size: "50",
    east__size: "400",
    
    west__onopen: function () { $xmleditor.resize(); },
    west__onresize: function () { $xmleditor.resize(); },
    
    east__onresize:		function () { $accordion.resize(); }
		
  });

  $accordion = $("#accordion").accordion({
    fillSpace:	true
  });



});
