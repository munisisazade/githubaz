
(function ($) {
    "use strict";
    jQuery(document).ready(function ($) {
        $(document).on('submit', '#contact-form', function (e) {
            e.preventDefault();
            var name = $('#name').val();
            var email = $('#email').val();
            var subject = $('#subject').val();
            var message = $('#message').val();

            if (!name) {
                 $('#name').removeClass('error');
                 $('#name').addClass('error').attr('placeholder', 'First Name');
             }else{
                 $('#name').removeClass('error');
             }
        
           
            if (!email) {
                 $('#email').removeClass('error');
                 $('#email').addClass('error').attr('placeholder','Enter Your Email')
             }else{
                 $('#email').removeClass('error');
             }

             if (!subject) {
                $('#subject').removeClass('error');
                $('#subject').addClass('error').attr('placeholder', 'Subject');
            }else{
                $('#subject').removeClass('error');
            }


            if (!message) {
                 $('#message').removeClass('error');
                 $('#message').addClass('error').attr('placeholder','Write Your Message')
             }else{
                 $('#message').removeClass('error');
             }
             
            
            if ( email && message && uname ) {
             	$.ajax({
	                 type: "POST",
	                 url:'contact.php',
	                 data:{
                         'name': name,
                         'email': email,
                         'subject': subject,
                         'message': message,
	                 },
	                 success:function(data){
                         $('#get_in_touch').children('.email-success').remove();
                         $('#get_in_touch').prepend('<span class="alert alert-success email-success">' + data + '</span>');
                         $('#name').val('');
                         $('#email').val('');
                         $('#subject').val('');
                         $('#message').val('');
                         $('.email-success').fadeOut(5000);
	                 },
	                 error:function(res){

	                 }
	             });
             }else{
                $('#get_in_touch').children('.email-success').remove();
                $('#get_in_touch').prepend('<span class="alert alert-danger email-success">Somenthing is wrong</span>');
                $('.email-success').fadeOut(5000);
             }
        });
    })

}(jQuery));	
