

(function($){		
	$(document).ready(function() {
								
		$('#iifym-calculate').click(function(event) {
			
			event.preventDefault();
			
			var weight = $('#weight').val();
			var height = $('#height').val();
			var age = $('#age').val();
			var gender = $('#gender').val();
			var activity = $('#activity').val();
			var overweight = $('#overweight:checked').val();
			
			if ( overweight == 'Yes' ) {
				if ( gender == 0 ) {
					var bmr = ( 10 * weight ) + ( 6.25 * height ) - ( 5 * age ) + 5; // men
				} else {
					var bmr = ( 10 * weight ) + ( 6.25 * height ) - ( 5 * age ) - 161; // women
				}
			} else {
				if ( gender == 0 ) {
					var bmr = ( 13.75 * weight ) + ( 5.003 * height ) - ( 6.775 * age ) + 66.5; // men
				} else {
					var bmr = ( 9.563 * weight ) + ( 1.85 * height ) - ( 4.676 * age ) + 655.1; // women
				}
			}
			
			if ( activity == 0 ) {
				tdee = bmr * 1.2;
			} else if ( activity == 1 ) {
				tdee = bmr * 1.375;
			} else if ( activity == 2 ) {
				tdee = bmr * 1.55;
			} else if ( activity == 3 ) {
				tdee = bmr * 1.725;
			} else {
				tdee = bmr * 1.9;
			}
			
			bmr = Math.round(bmr * 100) / 100;
			tdee = Math.round(tdee * 100) / 100;
			
			$('#iifym-results .bmr').text(bmr);
			$('#iifym-results .tdee').text(tdee);
			$('#iifym-results').slideDown();
			
		});
					
	});
}(jQuery));

