"use strict";

$(document).ready(function() {
  $("button").click(function() {
    calculate();
  });
});

function calculate() {

  var result;

  //Keep string to parse
  var original = document.getElementById("original");
  
  //Saving original string to use localStorage
  var temp = original.value;
  if (window.localStorage) localStorage.original = temp;

  //
  // This regExp have tree side
  //  
  //    First accept Quoted values
  //
  //    Second unquoted values
  //
  //    Third and last empty strings
  //
  var regexp = /\s*"((?:[^"\\]|\\.)*)"\s*,?|\s*([^,]+),?|\s*,/g;
  
  // split values by return and whitespaces from input
  var lines = temp.split(/\n+\s*/);

  var commonLength = NaN;
  var r = [];

  
  
  for (var t in lines) {
    
    // each line will be parsed by regExp
    var temp = lines[t];
    
    // Result of match in m
    var m = temp.match(regexp);
    
    // Rows
    var result = [];
    
    var error = false;
    
    if (m) {
      if (commonLength && (commonLength != m.length)) {
        error = true;
      }
      else {
        commonLength = m.length;
        error = false;
      }
      for (var i in m) { 
        
        // comma deleted
        var removecomma = m[i].replace(/,\s*$/,'');
        
        // first simple quote deleted
        var remove1stquote = removecomma.replace(/^\s*"/,'');
        
        // last simple quote deleted
        var removelastquote = remove1stquote.replace(/"\s*$/,'');
        
        // Replace breaked quotes by simple simple quotes
        var removeescapedquotes = removelastquote.replace(/\\"/,'"');
        
        result.push(removeescapedquotes);
      }
      var row = error? 'error' : '';
      r.push( { value: result, row: row} );
    }
    else {
      alert('ERROR! row '+temp+' does not look as legal CSV');
      error = true;
    }
  }
  var template = parsedTable.innerHTML;
  finaltable.innerHTML = _.template( template, {items: r});
}

window.onload = function() {
  if (window.localStorage && localStorage.original) {
    document.getElementById("original").value = localStorage.original;
  }
};
