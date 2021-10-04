const openNav = document.querySelector(".open-btn");
const closeNav = document.querySelector(".close-btn");
const menu = document.querySelector(".nav-list");

var userPhoto = document.getElementById("userPhoto");
var userPhotoWoman = document.getElementById("userPhotoWoman");

var img1 = "images/user.jpg";

openNav.addEventListener("click", () => {
  menu.classList.add("show");
});

closeNav.addEventListener("click", () => {
  menu.classList.remove("show");
});

// Fixed Nav
const navBar = document.querySelector(".nav");
const navHeight = navBar.getBoundingClientRect().height;
window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  if (scrollHeight > navHeight) {
    navBar.classList.add("fix-nav");
  } else {
    navBar.classList.remove("fix-nav");
  }
});

// Scroll To
const links = [...document.querySelectorAll(".scroll-link")];
links.map((link) => {
  if (!link) return;
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const id = e.target.getAttribute("href").slice(1);

    const element = document.getElementById(id);
    const fixNav = navBar.classList.contains("fix-nav");
    let position = element.offsetTop - navHeight;

    window.scrollTo({
      top: position,
      left: 0,
    });

    navBar.classList.remove("show");
    menu.classList.remove("show");
    document.body.classList.remove("show");
  });
});


function onclickFuncGirl(){
  document.getElementById("userPhoto").src = "images/user-girl.png";
  document.getElementById("hidden-image").value="user-girl.png";
}

function onclickFuncWoman(){
  document.getElementById("userPhoto").src = "images/woman-user.png";
  document.getElementById("hidden-image").value="user-woman.png";
}
function onclickFuncUser(){
  document.getElementById("userPhoto").src = "images/user.jpg";
  document.getElementById("hidden-image").value="user.jpg";
}
function onclickFuncBoy(){
  document.getElementById("userPhoto").src = "images/user-boy.png";
  document.getElementById("hidden-image").value="user-boy.png";
}


// userPhotoWoman.onclick= function(){
//   document.getElementById("userPhoto").src = "images/user.jpg";
// }
