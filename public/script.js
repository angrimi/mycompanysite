window.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll('.slide');
  const texts = [
    {
      title: "레몬소프트와 시작하세요.",
      desc: "첫 번째 영상에 맞는 문구"
    },
    {
      title: "미래를 만나는 메타버스",
      desc: "두 번째 영상에 맞는 문구"
    },
    {
      title: "AI와 손잡고 나아가다",
      desc: "세 번째 영상에 맞는 문구"
    }
  ];

  const titleEl = document.querySelector('.slide-text h1');
  const descEl = document.querySelector('.slide-text p');

  let current = 0;

  function showSlide(index) {
    slides.forEach((video, i) => {
      video.classList.toggle('active', i === index);
      video.pause();
      video.currentTime = 0;
    });

    slides[index].play();
    titleEl.textContent = texts[index].title;
    descEl.textContent = texts[index].desc;
  }

  slides.forEach((video, i) => {
    video.addEventListener('ended', () => {
      current = (i + 1) % slides.length;
      showSlide(current);
    });
  });

  showSlide(current);
});

//스크롤
const container = document.querySelector('.scroll-container');
const sections = document.querySelectorAll('.section'); 
console.log('container:', container);
let currentSection = 0;
let isScrolling = false;

function scrollToSection(index) {
  if (index < 0 || index >= sections.length) return;
  isScrolling = true;

  // 스크롤하려는 목표 위치
  let targetTop = sections[index].offsetTop;

  // 최대 스크롤 가능한 위치 계산
  const maxScrollTop = container.scrollHeight - container.clientHeight;

  // 목표 위치가 최대 스크롤 위치보다 크면 maxScrollTop으로 맞춤
  if (targetTop > maxScrollTop) { targetTop = maxScrollTop;}

  container.scrollTo({ top: targetTop, behavior: 'smooth' });
  setTimeout(() => { isScrolling = false;}, 800);
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
//////////////////////section0////////////////////
document.addEventListener("DOMContentLoaded", function () {
    const text = "레몬소프트의 기술을 소개합니다";
    const target = document.getElementById("typing-text");

    let i = 0;
    function typing() {
      if (i < text.length) {
        target.innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, 200); // 타자 속도 조절 (100ms)
      }
    }

    typing();
  });
  //////////////////////section0->section2////////////////////
  



  //////////////////////section2////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide2");
  const navItems = document.querySelectorAll(".nav-item");
  let current = 0;
  const interval = 4000; // 4초마다 전환

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
    navItems.forEach((nav, i) => {
      nav.classList.toggle("active", i === index);
    });
    current = index; // 현재 인덱스 갱신
  }

  function nextSlide() {
    let nextIndex = (current + 1) % slides.length;
    showSlide(nextIndex);
  }

  // 목차 클릭 이벤트 연결
  navItems.forEach((nav, index) => {
    nav.addEventListener("click", () => {
      showSlide(index);
      // 자동 슬라이드 타이머를 초기화(리셋)하고 싶으면 아래 주석 해제
      // clearInterval(autoSlide);
      // autoSlide = setInterval(nextSlide, interval);
    });
  });

  // 초기화
  showSlide(current);
  let autoSlide = setInterval(nextSlide, interval);
});


document.addEventListener("DOMContentLoaded", () => {
  ///////////////////////////////////////////////////////////////////// 네비바 로딩 및 이벤트 바인딩
  fetch("navbar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar-container").innerHTML = data;

    const dropdowns = document.querySelectorAll('.dropdown');
    let currentPanel = null;   // 현재 열린 하단 메뉴
    let hideTimeout = null;    // 닫기 타이머

    function showPanel(panel) {
      // 닫기 타이머 있으면 취소
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }

      // 이전 열린 메뉴가 있으면 바로 닫기 (애니메이션 적용)
      if (currentPanel && currentPanel !== panel) {
        currentPanel.style.opacity = '0';
        currentPanel.style.visibility = 'hidden';
        currentPanel.style.pointerEvents = 'none';
        currentPanel.parentElement.classList.remove('active'); // 이전 메뉴 .active 제거
      }

      // 새 메뉴 열기
      panel.style.display = 'flex'; // 항상 flex 유지한다면 이 부분 생략 가능
      requestAnimationFrame(() => {
        panel.style.opacity = '1';
        panel.style.visibility = 'visible';
        panel.style.pointerEvents = 'auto';
      });

      panel.parentElement.classList.add('active'); // 현재 메뉴 .active 추가
      currentPanel = panel;
    }

    function hidePanel(panel) {
      panel.style.opacity = '0';
      panel.style.visibility = 'hidden';
      panel.style.pointerEvents = 'none';
      panel.style.display = 'none'; // 즉시 숨김

      if (currentPanel === panel) currentPanel = null;

      // 타이머 있으면 정리
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }

      panel.parentElement.classList.remove('active'); // 닫힐 때 .active 제거
    }

    dropdowns.forEach(dropdown => {
      const panel = dropdown.querySelector('.dropdown-panel');
      if (!panel) return;

      dropdown.addEventListener('mouseenter', () => {
        showPanel(panel);
      });

      dropdown.addEventListener('mouseleave', () => {
        hideTimeout = setTimeout(() => {
          if (!panel.matches(':hover')) {
            hidePanel(panel);
          }
        }, 100);
      });

      panel.addEventListener('mouseenter', () => {
        if (hideTimeout) {
          clearTimeout(hideTimeout);
          hideTimeout = null;
        }
        showPanel(panel);
      });

      panel.addEventListener('mouseleave', () => {
        hideTimeout = setTimeout(() => {
          hidePanel(panel);
        }, 100);
      });
    });


    
    // ✅ 기존 스크롤 처리 로직 이어붙이기
    const navbar = document.getElementById('navbar');
    const container = document.querySelector('.scroll-container');
    const sections = document.querySelectorAll('.section');

    container.addEventListener('scroll', () => {
      if (container.scrollTop > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

      // 스크롤 섹션 이동 함수
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

      // 휠 이벤트 (한 장씩 스크롤)
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
  });

  // 푸터 fetch (별도)
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

///////////////////section4////////////////////////
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


///////////////////section4////////////////////////
window.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".business-grid3");
  const originalItems = [...document.querySelectorAll(".item")];

  const repeatCount = 3; // 원본을 몇 번 반복할지
  for (let i = 0; i < repeatCount - 1; i++) {
    originalItems.forEach(item => {
      const clone = item.cloneNode(true);
      clone.classList.add("clone");
      container.appendChild(clone);
    });
  }

  const allItems = [...container.querySelectorAll(".item")];
  const itemWidth = originalItems[0].offsetWidth;
  const originalTotalWidth = itemWidth * originalItems.length;

  // 초기 위치 (첫 번째 원본 그룹 시작점)
  container.scrollLeft = 0;

  let autoScrollSpeed = 3;
  let isPaused = false;

  container.addEventListener("mouseenter", () => isPaused = true);
  container.addEventListener("mouseleave", () => isPaused = false);

  allItems.forEach(item => {
    item.addEventListener("mouseenter", () => isPaused = true);
    item.addEventListener("mouseleave", () => isPaused = false);
  });

  function autoScroll() {
    if (!isPaused) {
      container.scrollLeft += autoScrollSpeed;

      // 너무 많이 가면 원본 시작 위치로 리셋 (눈에 안 띄게)
      if (container.scrollLeft >= originalTotalWidth) {
        container.scrollLeft = 0;
      }
    }
    requestAnimationFrame(autoScroll);
  }

  autoScroll();

  // ✅ 카드 클릭 시 가운데 정렬
  allItems.forEach(item => {
    item.addEventListener("click", () => {
      const containerWidth = container.clientWidth;
      const cardOffsetLeft = item.offsetLeft - container.offsetLeft;
      const cardWidth = item.offsetWidth;

      const targetScrollLeft = cardOffsetLeft - (containerWidth / 2 - cardWidth / 2);

      container.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth"
      });
    });
  });
});
