// Copyright 2011 Sterling Cobb
// Available under both the GPL and MIT licenses.

// Check to see if jQuery is avalible.
if (typeof jQuery == 'undefined') throw("jQuery could not be found.");

(function($){
  $.fn.dirtInspector = function(params){

    // Defaults to be used when extending this jQuery object.
    var defaults = {
      ignore_dirty: ":submit",
      before_unload_message: "You are leaving without saving. Any unsaved data will be lost!",
      bind_before_unload: function( object ){
        object.on("beforeunload", function(){
          // Check if you are clicking a submit button
          return params.before_unload_message;
        });
      }
    }

    // Add default params to this jquery object to be used later.
    params = $.extend(defaults, params);

    this.each(function(){
      // This is a single jQuery object of a node.
      var $node = $( this );

      // If a submit button is clicked, don't worry about dirty form prompt. 
      $node.children( params.ignore_dirty ).click(function(){
        params.before_unload_message = null; // null disables the dirty form message.
      });

      // Override the changes being made in 'blur' instead, bind it to a keypress.
      $node.children().keyup(function(event){
        $(event.target).change();
      });

      // Check for any changes to form elements.
      $node.children().change(function(event){
        params.bind_before_unload( $( window ) );
      })
    });

    return this; // keep the channing. 
  }
})(jQuery);
