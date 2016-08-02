(function(window){

	window.pro = window.pro || {};
	window.pro.contact = window.pro.contact || {};

	var contact = window.pro.contact;


	contact.init = function(){

		var myLanguage = {};

		if(currentLanguage === "fr_FR") {

			myLanguage = {
				errorTitle : 'Erreur de soumission du formulaire!',
				requiredFields : 'Ce champ est obligatoire',
				badEmail : "vous n'avez pas donné une adresse email correcte",
				badTelephone : "vous n'avez pas donné un numéro de téléphone correct",
				badSecurityAnswer : "Vous n'avez pas répondu correctement à la question de sécurité",
				lengthBadStart : 'Vous devez répondre entre ',
				lengthBadEnd : ' caractères',
				lengthTooLongStart : 'Vous avez donné une réponse plus longue que ',
				lengthTooShortStart : 'Vous avez donné une réponse plus courte que ',
				badInt : "Vous n'avez pas donné un numéro correct"
			};
		}
		else {

			myLanguage = {
				requiredFields : 'This field is required'
			};
		}

		$.validate({

			form : '#contact-form',
			language : myLanguage,
			onSuccess : function() {
				contact.send(this.form);
				return false;
			}
		});
	};

	contact.send = function(formId){

		var $form = $(formId),
		$bottomForm = $form.find('.bottom-form');
		$bottomForm.removeClass('done').addClass('loading');

		$.ajax({
		    type: 'POST',
		    url: ajaxurl,
		    data:{
               'action'			: 'send_mail',
               'customerName'	: $form.find('#contactName').val(),
               'email'			: $form.find('#contactMail').val(),
               'phone'			: $form.find('#contactPhone').val(),
               'message'		: $form.find('#contactMessage').val(),
               'secure'			: $form.find('#contactSecure').val()
        }
		}).done(function(response) {
		    $(".response").text(response);
		    $bottomForm.addClass('done');
			$form[0].reset();


		}).fail(function(response) {

			var textError = "Sorry there was an error sending your message. Please try again later";

			if(currentLanguage === "fr_FR"){
				textError = "Désolé, une erreur est survenue. Merci de réessayer plus tard";
			}

		    $(".response").text(textError);
		    $bottomForm.addClass('done');
			$form[0].reset();

		});
	};


})(window);
