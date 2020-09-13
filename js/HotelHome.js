// RWD時的效果
window.onscroll = showPrice;
function showPrice(e) {
	let price = document.querySelectorAll('.price');
	let scrollY = e.path[1].scrollY;
	// 第一張
	if (scrollY>0 && scrollY<100) {
		price[0].style.opacity = 1;
	}else if (scrollY>300 || scrollY==0) {
		price[0].style.opacity = 0;
	}


	// 第二張
	if (scrollY>50 && scrollY<320) {
		price[1].style.opacity = 1;
	}else if (scrollY>700 || scrollY==0) {
		price[1].style.opacity = 0;
	}


	// 第三張
	if (scrollY>300 && scrollY<740) {
		price[2].style.opacity = 1;
	}else if (scrollY>1050 || scrollY<110) {
		price[2].style.opacity = 0;
	}


	// 第四張
	if (scrollY>700 && scrollY<1210) {
		price[3].style.opacity = 1;
	}else if (scrollY>1460 || scrollY<500) {
		price[3].style.opacity = 0;
	}


	// 第五張
	if (scrollY>1050 && scrollY<1350) {
		price[4].style.opacity = 1;
	}else if (scrollY<900) {
		price[4].style.opacity = 0;
	}


	// 第六張
	if (scrollY>1460 && scrollY<1578) {
		price[5].style.opacity = 1;
	}else if (scrollY<1300) {
		price[5].style.opacity = 0;
	}
}












