//스크롤
const container = document.querySelector('.scroll-container');
const sections = document.querySelectorAll('.section');  // .scroll-page → .section 변경
let currentSection = 0;
let isScrolling = false;

function scrollToSection(index) {
  if (index < 0 || index >= sections.length) return;
  isScrolling = true;
  container.scrollTo({
    top: sections[index].offsetTop,
    behavior: 'smooth'
  });
  setTimeout(() => {
    isScrolling = false;
  }, 800);
}

container.addEventListener('wheel', (e) => {
  if (isScrolling) return;

  if (e.deltaY > 0) {
    if (currentSection < sections.length - 1) {
      currentSection++;
      scrollToSection(currentSection);
    }
  } else {
    if (currentSection > 0) {
      currentSection--;
      scrollToSection(currentSection);
    }
  }
});


document.addEventListener("DOMContentLoaded", () => {
  // 네비게이션 로딩
  fetch("navbar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar-container").innerHTML = data;

    // ✅ 네비바 로딩 후 바인딩
    const navbar = document.getElementById('navbar');
    const scrollContainer = document.querySelector('.scroll-container');

    scrollContainer.addEventListener('scroll', () => {
      if (scrollContainer.scrollTop > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  });


  // 푸터 로딩
  fetch("footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer-container").innerHTML = data;
    });

  // fade-in 효과
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.2
  };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });




  // 탭 UI
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.tab-content .content').forEach(c => c.classList.remove('active'));
      const target = tab.getAttribute('data-target');
      document.getElementById(target).classList.add('active');
    });
  });
});


document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // 모든 탭에서 active 클래스 제거
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    // 클릭한 탭에 active 추가
    tab.classList.add('active');

    // 모든 콘텐츠 숨기기
    document.querySelectorAll('.tab-content .content').forEach(c => c.classList.remove('active'));
    // 클릭한 탭의 data-target 값으로 해당 콘텐츠 보여주기
    const target = tab.getAttribute('data-target');
    document.getElementById(target).classList.add('active');
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content .content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');

      // 탭 버튼 active 처리
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // 콘텐츠 전환 애니메이션
      contents.forEach(content => {
        if (content.id === targetId) {
          content.style.display = 'block'; // 다시 보이게
          content.classList.remove('active'); // 애니메이션 초기화
          void content.offsetWidth; // 리플로우로 transition 강제 재실행
          content.classList.add('active'); // 애니메이션 다시 실행
        } else {
          content.classList.remove('active');
          content.style.display = 'none';
        }
      });
    });
  });

  // 페이지 로딩 시 첫 탭 자동 애니메이션 (선택 사항)
  const defaultContent = document.querySelector('.tab-content .content.active');
  if (defaultContent) {
    defaultContent.style.display = 'block';
    void defaultContent.offsetWidth;
    defaultContent.classList.add('active');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content .content');

  // 탭 클릭 시 내용 전환 + 애니메이션
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      contents.forEach(content => {
        if (content.id === targetId) {
          content.style.display = 'block';
          content.classList.remove('active');      // 애니메이션 초기화
          void content.offsetWidth;                // 리플로우 트릭
          content.classList.add('active');         // 다시 애니메이션 실행
        } else {
          content.classList.remove('active');
          content.style.display = 'none';
        }
      });
    });
  });

  // 페이지 처음 로드 시 회사소개 자동 페이드인 처리
  const defaultTab = document.querySelector('.tab[data-target="about"]');
  const defaultContent = document.querySelector('#about');

  if (defaultContent && defaultTab) {
    defaultTab.classList.add('active');              // 탭 버튼 활성화
    defaultContent.style.display = 'block';          // 보여주기
    void defaultContent.offsetWidth;                  // 트랜지션 강제 트리거
    defaultContent.classList.add('active');           // 아래에서 위로 페이드인
  }
});

// 협력사 로고
document.addEventListener('DOMContentLoaded', () => {
  const logos = document.querySelector('.partner-logos');
  let slides = document.querySelectorAll('.partner-item');
  const slideWidth = slides[0].offsetWidth;
  const slideCount = slides.length;

  // 👉 클론 생성
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slideCount - 1].cloneNode(true);
  logos.appendChild(firstClone);
  logos.insertBefore(lastClone, slides[0]);

  // 👉 clone 추가 후, 다시 slide 리스트 갱신
  slides = document.querySelectorAll('.partner-item');

  // 👉 초기 위치 설정
  let currentIndex = 1;
  const totalSlides = slides.length;
  logos.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

  // 👉 transitionend를 전역에서 1회만 등록
  logos.addEventListener('transitionend', () => {
    if (currentIndex === totalSlides - 1) {
      logos.style.transition = 'none';
      currentIndex = 1;
      logos.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }
    if (currentIndex === 0) {
      logos.style.transition = 'none';
      currentIndex = totalSlides - 2;
      logos.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }
  });

  // 👉 슬라이드 이동 함수
  function moveToSlide(index) {
    logos.style.transition = 'transform 0.5s ease-in-out';
    logos.style.transform = `translateX(-${slideWidth * index}px)`;
  }

  // 👉 다음 슬라이드
  function goToNextSlide() {
    currentIndex++;
    moveToSlide(currentIndex);
  }

  // 👉 자동 슬라이드
  let autoSlide = setInterval(goToNextSlide, 3000);
});




document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // 한 번만 작동
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  document.querySelectorAll('.history-list li').forEach((li, i) => {
    li.style.transitionDelay = `${i * 0.05}s`; // 계단식 애니메이션
    observer.observe(li);
  });
});
