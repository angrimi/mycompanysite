// 네비게이션 바 보이기/숨기기 로직
let lastScrollY = window.scrollY;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  // 항상 보이게 하려면 숨김 클래스를 아예 안 붙임
  // 또는 필요하면 다른 조건으로 수정 가능
  navbar.classList.remove('hidden');
});
