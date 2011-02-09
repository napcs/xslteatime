$(function(){
  
  //$("#help").hide();
  
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
  
  var transformViaAjax = function(){
    $("#output").html("I got this.... hold on a sec..");
 
      $("#code").val($xmleditor.getCode());

      $("#xslt").val($xslteditor.getCode());
    
    $.ajax({
      type: "POST",
      url: "/",
      dataType: 'json',
      data: $("#xslteatime_form").serialize(),
      success: function(data){
        if(data["errors"]){
          $('#output').html("<h2>There were errors with your input</h2>" + data['errors']);
        }else{
          $('#output').html(data["render"]);
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
    north__size: "100",
    south__size: "50",
    east__size: "400",
    center__size: "400",
  });


  var $xmleditor = CodeMirror.fromTextArea("code", {
    parserfile: ["parsexml.js"],
    path: "/javascript/codemirror/js/",
    tabmode: "spaces",
    stylesheet: "/javascript/codemirror/css/xmlcolors.css"
  });
  var $xslteditor = CodeMirror.fromTextArea("xslt", {
    parserfile: ["parsexml.js"],
    path: "/javascript/codemirror/js/",
    tabmode: "spaces",
    stylesheet: "/javascript/codemirror/css/xmlcolors.css"
  });


});
