const date = new Date();

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      document.getElementById("form-date").value=`${new Date().toISOString().substr(0,10)}`
      days += `<div onclick="change_date(this)" target="${date.getFullYear()}-${(date.getMonth()>=9?"":"0")+(date.getMonth()+1).toString()}-${i>=10?i:"0"+i.toString()}" class="today" >${i}</div>`;
    } else {
      days += `<div onclick="change_date(this)" target="${date.getFullYear()}-${(date.getMonth()>=9?"":"0")+(date.getMonth()+1).toString()}-${i>=10?i:"0"+i.toString()}">${i}</div>`;
    }
  }



  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});


onClick: function change_date (d) {
      let userdate = d.getAttribute("target");
      document.getElementById("form-date").value = userdate;
      let today = document.getElementsByClassName("today")[0];
      if(today)
        today.removeAttribute("class");
      d.setAttribute("class","today");
      document.querySelector(".date p").innerHTML = new Date(userdate).toDateString();      
};

onClick: function change_date (d) {
  let userdate = d.getAttribute("target");
  document.getElementById("form-dateT").value = userdate;
  let today = document.getElementsByClassName("today")[0];
  if(today)
    today.removeAttribute("class");
  d.setAttribute("class","today");
  document.querySelector(".date p").innerHTML = new Date(userdate).toDateString();      
};
renderCalendar();
