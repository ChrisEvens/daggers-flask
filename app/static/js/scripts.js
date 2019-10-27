
// ********** FUNCTIONS **********

function noScroll() {
  window.scrollTo( 0, 0 );
}

function removeFadePattern(){
  var element = document.getElementById("cover");
  element.classList.add("cover-hidden");
}

function addFadePattern(){
  var element = document.getElementById("cover");
  element.classList.remove("cover-hidden");
}

document.addEventListener("DOMContentLoaded", function(event) {
  // ********** LISTENERS **********

  // add listener to disable scroll
  window.addEventListener('scroll', noScroll);

  // Remove listener to disable scroll
  window.removeEventListener('scroll', noScroll);

  var nofire = document.getElementsByClassName("social-icons");
  for (var i = 0; i < nofire.length; ++i) {
      nofire[i].addEventListener("touchstart", function(e) {
          e.stopPropagation();
      }, true);
  }

  document.body.addEventListener("touchstart", function(e) {
      removeFadePattern();
  }, false);

  var nofire = document.getElementsByClassName("social-icons");
  for (var i = 0; i < nofire.length; ++i) {
      nofire[i].addEventListener("touchend", function(e) {
          e.stopPropagation();
      }, true);
  }
  document.body.addEventListener("touchend", function(e) {
    addFadePattern();
  }, false);

  $("#mailToggle").click(function(e){
    e.preventDefault();
    $(".contact-form").fadeToggle();
  });

  $(document).mouseup(function(e)
  {
      var container = $(".contact-form");
      // if the target of the click isn't the container nor a descendant of the container
      if (!container.is(e.target) && container.has(e.target).length === 0)
      {
          container.fadeOut();
      }
  });

  // Contact form AJAX

  /* attach a submit handler to the form */
  $("#formoid").submit(function(event) {
    /* stop form from submitting normally */
    event.preventDefault();

    /* get the action attribute from the <form action=""> element */
    var $form = $( this ),
        url = $form.attr( 'action' );

    /* Send the data using post with element id name and name2*/
    var posting = $.post( url, {
      name: $('#form_name').val(),
      email: $('#form_email').val(),
      message: $('#form_message').val(),
      trap: $('#form_trap').val()
    } );

    /* Alerts the results */
    posting.done(function( data ) {
      console.log(data);
      var json = JSON.parse(data);
      if (json.success) {
        $("#sent_confirmation").toggle();
      }
    });

  });

}, false);
