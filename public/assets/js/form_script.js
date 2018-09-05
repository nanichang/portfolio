"use strict";

/* Ajax Form Plugin V 1.0.1
 * Send contact and newsletter form data to a server and waiting for its response.
 * Compatible with jquery validator plugin
 */

(function ($) {

	$.fn.initForm = function (options) {
		let settings = $.extend({
			type: 'post',
			serverUrl: "/",
			successClean: this.find('.form-success-clean'),
			successGone: this.find('.form-success-gone'),
			successInvisible: this.find('.form-success-invisible'),
			successVisible: this.find('.form-success-visible'),
			textFeedback: this.find('.form-text-feedback'),
		}, options);
		
		let $ajax = {
			sendRequest: function (p) {
				let form_fill = $(p);

				// Get the form data.
				let form_inputs = form_fill.find(':input');
				let form_data = {};
				console.log('form data: ', form_data);
				form_inputs.each(function () {
					form_data[this.name] = $(this).val();
				});
				
				$.ajax(
					{
						/*
						 *Your Ajax Server Here, 
						 * use internal url (such as './ajaxserver/server.php') or 
						 * external URL such as:  url: 'http://www.example.com/avenir/ajaxserver/server.php'
						 * depending to your requirements
						 */
						url: settings.serverUrl,
						type: settings.type,
						data: form_data,
						dataType: 'json',
						headers: {
							'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
						},

						/* CALLBACK FOR SENDING EMAIL GOEAS HERE */
						success: function (data) {
							//Ajax connexion was a success, now handle response
							if (data && !data.error) {
								// Hide for if no error
								settings.successClean.val("");
								settings.successInvisible.addClass('invisible');
								settings.successGone.addClass('gone');
								settings.successVisible.removeClass('invisible');
								settings.successVisible.removeClass('gone');
								console.log('Request sent successfully');
								console.log('Request setting: ', settings.serverUrl);
							}
							// Else the login credentials were invalid.
							else {
								//Ajax connexion reject an error a success, now handle response
								settings.textFeedback.removeClass('gone');
								settings.textFeedback.removeClass('invisible');
								settings.textFeedback.html('Error when sending request.');
								console.log('Could not process AJAX request to server');
							};
						},
						/* show error message */
						error: function (jqXHR, textStatus, errorThrown) {
							//ajax error
							settings.textFeedback.removeClass('gone');
							settings.textFeedback.removeClass('invisible');
							settings.textFeedback.html('Error when sending request.');
							console.log('ajax error');

						}
						/* END EMAIL SENDING CALLBACK */
					});
			}

		};


		//if jquery validator plugin is enable, use it	
		if (jQuery.validator) {
			jQuery.validator.setDefaults({
				success: "valid"
			});
			this.validate({
				rules: {
					field: {
						required: true,
						email: true
					}
				}
			});
		};



		this.submit(function (event) {
			// prevent default submit
			console.log('Send request');
			event.preventDefault();
			// use jquery validator plugin if it is enabled
			if (jQuery.validator) {
				if ($(this).valid()) {
					$ajax.sendRequest(this);
				};
			}
			else {
				$ajax.sendRequest(this);
			};
		});

	};

}(jQuery));

/* End of ajax */


// Make them as plugin
