$(function() {

	var $colors = $('#selectColor');
	//text typed in by the user
	var $textInput = $('input:text');
	//for changing placeholder value
	var $inputLabel = $('#inputLabel');
	var $delMode = $('#deleteMode');
	var $sortMode = $('#sortMode');
	//the color the user selects in the color selection div to apply to
	//the item they are creating
	var thisColor = 'white';
	var colorWheel = ['red', 'yellow', 'green', 'white'];
	var count;

	//color selector when adding a new item
	$colors.hide();	

	function toggleDel() {
		$delMode.toggleClass('on');
		//adds css class for trash icon
		if($delMode.hasClass('on')) {
			$('li').each(function() {
				$(this).addClass('liDel');
			});
		} else{
			$('li').each(function() {
				$(this).removeClass('liDel');
			});
		};
	};

	function sortByColor() {
		var ul = $('ul');
		var lis = $('li');
		var liLength = $('li').size();
		var items = [];

		for(i = 0; i < liLength; i++) {
			var liObj = {};
			liObj.txt = lis.eq(i).text();
			liObj.idNum = lis.eq(i).attr('id');
			liObj.color = lis.eq(i).attr('class');

			if(liObj.color === 'red') {
				liObj.order = 1;
			}else if(liObj.color === 'yellow') {
				liObj.order = 2;
			}else if(liObj.color === 'green') {
				liObj.order = 3;
			}else {liObj.order = 4};

			items.push(liObj);
		};

		items.sort(function(a,b) {
			return a.order - b.order;
		});

		ul.empty();

		$.each(items, function(i, value) {
			ul.append('<li class="' + items[i].color + '" '
				+ 'id="' + items[i].idNum + '">'
				+ items[i].txt
				+ '</li>');
		});
	};

	function sortById() {
		var ul = $('ul');
		var lis = $('li');
		var liLength = $('li').size();
		var items = [];

		for(i = 0; i < liLength; i++) {
			var liObj = {};
			liObj.txt = lis.eq(i).text();
			liObj.idNum = lis.eq(i).attr('id');
			liObj.color = lis.eq(i).attr('class');

			liObj.order = liObj.idNum.replace(/li/,'');
			
			items.push(liObj);
		};

		items.sort(function(a,b) {
			return b.order - a.order;
		});

		ul.empty();

		$.each(items, function(i, value) {
			ul.append('<li class="' + items[i].color + '" '
				+ 'id="' + items[i].idNum + '">'
				+ items[i].txt
				+ '</li>');
		});
	};

	//when user focuses on the text box to start adding a new label, show
	//the color selection div
	$inputLabel.on('focus', function() {
		$colors.show();
		if($delMode.hasClass('on')) {
			toggleDel();
		};
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
		$('#list').prepend('<li>' + newText + '</li>');
		$('li:first').addClass(thisColor)
			.attr('id', 'li' + $('li').length);
		
		if($sortMode.hasClass('on')) {
			sortByColor();
		};
//		.bind('selectstart', function(){ return false; });
		$textInput.val('');
		thisColor = 'white';
		$colors.hide();
		$('#thisColorText').remove();
		$inputLabel.attr('placeholder', 'Label it');
	});

	//delete mode on or off determines if clicking on a list item will change
	//its color or delete the item. when delete mode is off, clicking on list items will
	//change its color

	$delMode.on('click', function() {
		$colors.hide();
		toggleDel();
	});

	$('ul').on('click', 'li', function() {

		if($delMode.hasClass('on')) {
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

	//toggle sort mode between class or id
	$sortMode.on('click', function() {
		$colors.hide();
		if($delMode.hasClass('on')) {
			toggleDel();
		};

		$sortMode.toggleClass('on');
		if($sortMode.hasClass('on')) {
			sortByColor();
		}else{
			sortById();
		};
	});
});
