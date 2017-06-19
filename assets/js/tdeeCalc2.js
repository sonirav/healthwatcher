function getActivityLevelValue(form)
{
	//initial
	activitylevel=0;

	for (var i=0; i < form.activitylevel.length; i++)
	{
		if (form.activitylevel[i].checked)
	        {
        	       	var activitylevel = form.activitylevel[i].value;
      	        }
        }

	switch(activitylevel)
       	{
        case "sedentary":
		activitylevel=1.2;
	break
	case "light":
 		activitylevel=1.375;
	break
	case "moderate":
		activitylevel=1.55;
	break
	case "very":
		activitylevel=1.725;
	break
	case "extra":
		activitylevel=1.9;
	break
	}	

    	return activitylevel;
}

function getGenderValue(form)
{
	//initial
	gender=0;

	for (var i=0; i < form.gender.length; i++)
		{
			if (form.gender[i].checked)
			{
		     	var gender = form.gender[i].value;
		    }	
		}
 			return gender;
}

// Determine weight metric from radio buttons
function getWeightMetricValue(form)
{
	//initial
	weightMetric=0;

	for (var i=0; i < form.weightmetric.length; i++)
	   	{
	   	if (form.weightmetric[i].checked)
	   	   {
	   	   var weightMetric = form.weightmetric[i].value;
	   	   }
	   	}
	 		return weightMetric;
}

// Validates that a radio button is not empty
function validateEmptyRadioButton(elem, helperMsg)
{
	if(elem == 0)
	{
		alert(helperMsg);
		//elem.focus(); // set the focus to this input
		return false;
	}
	return true;
}

// Validates that a text field is not empty
function validateEmptyTextField(elem, helperMsg)
{
	if(elem.length == 0)
	{
		alert(helperMsg);
		//elem.focus(); // set the focus to this input
		return false;
	}
	return true;
}

// Validates that the text feild is numerical
function validateNumeric(elem, helperMsg)
{

	if(isNaN(elem))
	{
		alert(helperMsg);
		//elem.focus();
		return false;
	}
	else
	{
		return true;
	}
}

// This function calculates tdee 
function tdeeCalc(gender,weight,feet,inches,age,activitylevel)
{	
	var inches=parseInt(inches);

	if (gender=='Male')
	{
		weight=weight*13.7;
		height=(feet*12)+inches;
		height=height*2.54;  //convert to cm.
		height=height*5;
		age=age*6.8;
		
		bmr=66+weight+height-age;
		tdee=bmr*activitylevel;
		tdee=Math.round(tdee);
		return tdee;
	}
	else
		weight=weight*9.6;
		height=(feet*12)+inches;		
		height=height*2.54;  //convert to cm.
		height=height*1.8;
		age=age*4.7;
		
		bmr=655+weight+height-age;
		tdee=bmr*activitylevel;
		tdee=Math.round(tdee);
		return tdee;
}

//Main
function calculateTDEE(form) 
{
	// variables start here
        var weight=form.weight.value;
        var feet=form.feet.value;
        var inches=form.inches.value;
        var age=form.age.value;
        var gender=getGenderValue(form);
        var weightMetric=getWeightMetricValue(form);
	var activitylevel=getActivityLevelValue(form);
	//variables end here

	// start validation of the form here
        validateEmptyRadioButton(gender,'Please choose your gender.');
        validateEmptyRadioButton(weightMetric,'Please choose a weight metric.');
	validateEmptyRadioButton(activitylevel,'Please choose an activity level.');
        validateEmptyTextField(weight,'Please enter your weight.');
        validateEmptyTextField(feet,'Please enter feet.');
        validateEmptyTextField(inches,'Please enter inches.');
        validateEmptyTextField(age,'Please enter your age.');
        validateNumeric(weight,'Please only enter numbers in the fields.');
        validateNumeric(feet,'Please only enter numbers in the fields.');
        validateNumeric(inches,'Please only enter numbers in the fields.');
        validateNumeric(age,'Please only enter numbers in the fields.');
        //end validation of the form here

	// if metric equals to pounds then convert to kilograms
        if (weightMetric=="pounds")
                var weight=weight/2.2;

	// calculate tdee
        tdeeCalc(gender,weight,feet,inches,age,activitylevel);

        form.tdee.value = tdee;
}