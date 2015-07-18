$(function() {

	var $colors = $('#selectColor');
	//text typed in by the user
	var $textInput = $('input:text');
	//for changing placeholder value
	var $inputLabel = $('#inputLabel');
	//the color the user selects in the color selection div to apply to
	//the item they are creating
	var thisColor = 'white';
	var colorWheel = ['red', 'yellow', 'green', 'white'];
	var count;

	//hide the color selector until user focuses on the text input
	//to create a new item
	$colors.hide();	

	//when user focuses on the text box to start adding a new label, show
	//the color selection div
	$inputLabel.on('focus', function() {
		$colors.show();
	});

	//get the value of whichever button the user selects to apply to the 
	//new item
	$('button[class="color"]').on('click', function() {
		thisColor = this.id;
		$('#thisColorText').remove();
		$('#colorText').after('<p id="thisColorText">' + thisColor + '</p>');
	});

	//when user submits the form, get the user input and create a new list
	//item, add it to the start of the list and update its class attribute to
	//whatever the user selected. if the user doesnt select any class, it will
	//show default white color
	$('#controls').on('submit', function(e) {
		e.preventDefault();
		var newText = $textInput.val();
		if(newText === '') {
			$inputLabel.attr('placeholder', 'No text entered!');
			return;
		};
		$('li:first').before('<li>' + newText + '</li>');
		$('li:first').addClass(thisColor);
		$('li:first').attr('id', 'li' + $('li').length);
//		.bind('selectstart', function(){ return false; });
		//empty the content of variables used in this session for new items
		//and hide the color selection div
		$textInput.val('');
		thisColor = 'white';
		$colors.hide();
		$('#thisColorText').remove();
		$inputLabel.attr('placeholder', 'Label it');
	});

	//delete mode on or off determines if clicking on a list item will change
	//its color or delete the item. when delete is on, a trash can icon will
	//display on all listed items and clicking on it will animate the list
	//item and delete it. when delete mode is off, clicking on list items will
	//change its color

	$('#deleteMode').on('click', function() {
		$(this).toggleClass('on');
		//add css class for trash icon
		if($('#deleteMode').hasClass('on')) {
			$('li').each(function() {
				$(this).addClass('liDel');
			});
		} else{
			$('li').each(function() {
				$(this).removeClass('liDel');
			});
		};
	});

	//changes color of list item or deletes it based on deleteMode on/off
	$('ul').on('click', 'li', function() {

		if($('#deleteMode').hasClass('on')) {
			$(this).remove();
			count = $('li').length;

			//recount the list items and update their id attr
			$('li').each(function() {
				$(this).attr('id', 'li' + count);
				count--;
			});

		} else {
			var i = 0;
			var thisColor = this.className;	

			while(thisColor != colorWheel[i]) {
				i++;
			};
			i++;
			if (i > 3) {
				i = 0;
			};
			$(this).attr('class', colorWheel[i]);
		};
	});

});