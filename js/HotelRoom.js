let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let months = [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

function next() {
    // 當前年份 = 如果現在月份等於11，回傳當前年份+1，否則是當前年份
    currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    // 當前月份 = (當前月份+1)%12;超過12賦於差值
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
    DateClickEvent();
}

function previous() {
    currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
    DateClickEvent();
}

function showCalendar(month, year) {
    // 某年某月的1號是星期幾
    let firstDay = new Date(year, month).getDay();
    // new Date(year, month, 32).getDate()會得到某年某月第32天的日期(1-31)
    // 一個月最多31天，第32天為下個月的第一天，所以用32減去某月的第一天會等於某月的總天數
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    let tbl = document.getElementById("calendar-body");

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = year + " " + months[month];

    // creating all cells
    // 以“行數”去跑迴圈，不超過6行，小於6行執行程式碼
    let date = 1; //月份的日期
    for (let i = 0; i < 6; i++) {
        // create“行”tr
        let row = document.createElement("tr");

        // 跑回圈，j為星期幾，j若小於星期的天數就執行程式碼
        for (let j = 0; j < 7; j++) {
            // 若i等於0而且j小於“某年某月的1號的星期幾”就執行程式碼
            if (i === 0 && j < firstDay) {
                // create行裡面的“格子”td
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                // 在“格子”裡面加入“空字串”cellText
                cell.appendChild(cellText);
                // 在“行”裡面加入“格子”
                row.appendChild(cell);
            }
            // 若月份日期大於某月的總天數，結束迴圈
            else if (date > daysInMonth) {
                break;
            } else {
                // create“格子“
                let cell = document.createElement("td");
                let span = document.createElement("span");
                // create“日期”
                let cellText = document.createTextNode(date);

                // 今天之前的日期加上無法選擇樣式
                if (
                    year === today.getFullYear() &&
                    month === today.getMonth() &&
                    date < today.getDate()
                ) {
                    span.classList.add("dateBefore");
                    span.style.cursor = "auto";
                } else if (
                    year === today.getFullYear() &&
                    month === today.getMonth() &&
                    date === today.getDate()
                ) {
                    span.classList.add("bg-info");
                }
                // 把“日期”加到span
                span.appendChild(cellText);
                // 把span加到“格子”
                cell.appendChild(span);
                // 把“格子”加到“行”
                row.appendChild(cell);
                date++;
            }
        }
        // 把每一“行”加入calendar-body
        tbl.appendChild(row);
    }
}

function DateClickEvent() {
    let dateClick = document.querySelectorAll("td span");
    for (let i = 0; i < dateClick.length; i++) {
        dateClick[i].addEventListener("click", orderDate, false);
    }
}
DateClickEvent();

function orderDate(e) {
    if (
        e.target.className === "dateBefore" ||
        e.target.className === "orderColor"
    ) {
        alert("該日期無法選擇");
        return;
    }
    e.target.parentElement.classList.toggle("orderDate");
}

// 確定日期
let checkDate = document.getElementById("checkDate");

function check_Date() {
    let allDate = document.querySelectorAll("td");
    let jsDate = document.getElementById("jsDate");
    let jsAmount = document.getElementById("jsAmount");
    let jsRoomName = document.getElementById("jsRoomName");
    let roomName = document.querySelector(".roomName");
    let dateArray = [];
    let priceArry = [];
    let str = "";
    for (let i = 0; i < allDate.length; i++) {
        if (allDate[i].className === "orderDate") {
            priceArry.push(allDate[i].cellIndex);
            dateArray.push(allDate[i].textContent);
        }
    }
    let price = priceCount(priceArry);
    if (dateArray.length === 0) {
        alert('請選擇日期');
    } else if (dateArray.length >= 90) {
        alert('訂房天數不得超過90天');
    } else {
        // 判斷選取的日期中間是否為空白
        let arraylen = dateArray.length;
        for (let i = 0; i < dateArray.length; i++) {
            if (dateArray[i] - dateArray[i + 1] === -1) {
                arraylen -= 1;
            }
        }
        if (arraylen === 1) {
            str = currentYear + 'x' + (currentMonth + 1) + 'x' + dateArray[0] + '-' + currentYear + 'x' + (currentMonth + 1) + 'x' + dateArray[dateArray.length - 1]
            jsDate.value = str;
            jsAmount.value = price;
            jsRoomName.value = roomName.textContent;
            check_Date_color();

        } else {
            jsDate.value = '';
            jsAmount.value = '';
            alert('日期與日期之間不得空白，請重新選擇');
        }
    }
}
// 確認日期後變更顏色
function check_Date_color(argument) {
    let date = document.querySelectorAll("td");
    for (let i = 0; i < date.length; i++) {
        if (date[i].className === "orderDate") {
            date[i].classList.remove("orderDate");
            date[i].classList.add("checkDate");
        }
    }
}

// 計算平日與假日的價錢
function priceCount(params) {
    let price = [1500, 1380, 1380, 1380, 1380, 1500, 1500];
    let total = 0;
    params.forEach(function (item) {
        total += price[item];
    })
    return total;
}

// 重設日期
let resetDate = document.getElementById("resetDate");

function reset_Date() {
    let allDate = document.querySelectorAll("td");
    let jsDate = document.getElementById("jsDate");
    let jsAmount = document.getElementById("jsAmount");
    for (let i = 0; i < allDate.length; i++) {
        if (allDate[i].className === "checkDate") {
            allDate[i].classList.remove("checkDate");
        };
    };
    jsDate.value = "";
    jsAmount.value = "";
}

// 確定預約判斷是否有未填資料
let orderCheck = document.getElementById("orderCheck");


function submitInfo(event) {
    event.preventDefault();
    let roomStyle = document.getElementById("roomName");
    let allDate = document.querySelectorAll("td");
    let nameArea = document.getElementById("nameArea");
    let phoneArea = document.getElementById("phoneArea");
    let dateArea = document.getElementById("dateArea");
    let amountArea = document.getElementById("amountArea");
    if (nameArea.lastElementChild.value === "") {
        nameArea.appendChild(createErrorMessage("請輸入姓名"));
    } else {
        if (
            nameArea.lastElementChild.tagName === "P" &&
            nameArea.firstElementChild.value !== ""
        ) {
            nameArea.lastElementChild.remove(nameArea.lastElementChild);
        }
    }

    if (phoneArea.lastElementChild.value === "") {
        phoneArea.appendChild(createErrorMessage("請輸入電話"));
    } else {
        if (
            phoneArea.lastElementChild.tagName === "P" &&
            phoneArea.firstElementChild.value !== ""
        ) {
            phoneArea.lastElementChild.remove(phoneArea.lastElementChild);
        }
    }

    if (dateArea.lastElementChild.value === "") {
        // dateArea.appendChild(createErrorMessage("請選擇日期"));
        alert('請確定日期！');
        return;
    } else {
        if (
            dateArea.lastElementChild.tagName === "P" &&
            dateArea.firstElementChild.value !== ""
        ) {
            dateArea.lastElementChild.remove(dateArea.lastElementChild);
        }
    }

    if (
        nameArea.lastElementChild.tagName !== "P" &&
        phoneArea.lastElementChild.tagName !== "P" &&
        dateArea.lastElementChild.tagName !== "P"
    ) {
        for (let i = 0; i < allDate.length; i++) {
            if (allDate[i].className === "checkDate") {
                allDate[i].classList.remove("checkDate");
                allDate[i].lastElementChild.classList.remove("bg-info");
                allDate[i].firstElementChild.classList.add("orderColor");
                allDate[i].firstElementChild.style.cursor = "auto";
            }
        }
        postData();
        nameArea.firstElementChild.value = "";
        phoneArea.firstElementChild.value = "";
        dateArea.firstElementChild.value = "";
        amountArea.firstElementChild.value = "";
    }
    // 資料驗證
    function postData() {
        let xhr = new XMLHttpRequest();
        let senData = "";
        // xhr.open('post', 'http://' , true);
        // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        senData =
            "name=" +
            nameArea.lastElementChild.value +
            "&phone=" +
            phoneArea.lastElementChild.value +
            "&date=" +
            dateArea.lastElementChild.value +
            "&Amount=" +
            amountArea.lastElementChild.value +
            "&roomName=" +
            roomStyle.lastElementChild.value;

        location.href = "HotelCheckPage.html?" + senData;
        // xhr.send(senData);
        // console.log(senData);
    }
}

// createErrorMessage
function createErrorMessage(msg) {
    let createError = document.createElement("p");
    createError.innerText = msg;
    createError.classList.add("errorColor");
    return createError;
}

// Swiper img
var mySwiper = new Swiper(".swiper-container", {
    // Optional parameters
    direction: "horizontal",
    loop: false,
    speed: 2000,
    autoplay: {
        delay: 3000,
    },
    effect: "slider",

    // If we need pagination
    pagination: {
        el: ".swiper-pagination",
    },

    // Navigation arrows
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    // And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
});