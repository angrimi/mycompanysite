// 네비게이션 바 보이기/숨기기 로직
let lastScrollY = window.scrollY;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  // 항상 보이게 하려면 숨김 클래스를 아예 안 붙임
  // 또는 필요하면 다른 조건으로 수정 가능
  navbar.classList.remove('hidden');
});

document.addEventListener('DOMContentLoaded', () => {
  const faders = document.querySelectorAll('.fade-in');

  const appearOptions = {
    threshold: 0.2
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // 한 번만 실행
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});

// navar
document.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("navbar-container").innerHTML = data;
    });
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer-container").innerHTML = data;
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

  let currentIndex = 0;
  const slideCount = document.querySelectorAll('.partner-item').length;
  const slideWidth = 1000; // 이미지 한 장 크기

  // 👉 슬라이드 이동 함수
  function moveToSlide(index) {
    logos.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  // 👉 다음 슬라이드로 이동
  function goToNextSlide() {
    currentIndex = (currentIndex + 1) % slideCount; // 🔁 마지막 → 처음
    moveToSlide(currentIndex);
  }

  // 👉 이전 슬라이드로 이동
  function goToPrevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount; // 🔁 처음 → 마지막
    moveToSlide(currentIndex);
  }


  // ✅ 자동 슬라이드 (3초마다)
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
