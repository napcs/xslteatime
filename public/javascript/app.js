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
