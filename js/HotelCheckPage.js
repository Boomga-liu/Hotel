//取？之後的值
let str = window.location.search.substring(1);
let array = str.split('&');

getValue(array);
function getValue(array){
	let newArry = [];
	array.forEach(function (item){
		// console.log(item.split('=')[1]);
		newArry.push(item.split('=')[1]);
		// console.log(newArry);
	});

	let RoomName = document.getElementById('RoomName');
	let RoomDate = document.getElementById('RoomDate');
	let RoomAmount = document.getElementById('RoomAmount');
	let name = document.getElementById('name');
	let phone = document.getElementById('phone');

	RoomName.textContent = newArry[4].replace(/%20/, ' ');
	RoomDate.textContent = newArry[2].replace(/x/g, '/');
	RoomAmount.textContent = '$ ' + newArry[3];
	name.textContent = newArry[0];
	phone.textContent = newArry[1];
}

function checkButton (event) {
	let model = document.querySelector('.model-back');
	let RoomName = document.getElementById('RoomName');
	let model_room = document.getElementById('model-room');
	model_room.textContent =`你已成功預約 ${RoomName.textContent} 囉！`;
	model.style.display = 'block';
}