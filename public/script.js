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
  const descEls = document.querySelectorAll('.slide-text p');
  const dots = document.querySelectorAll('.slide-dot');

  let current = 0;

  function showSlide(index) {
    slides.forEach((video, i) => {
      video.classList.toggle('active', i === index);
      video.pause();
      video.currentTime = 0;
    });

    slides[index].play();
    titleEl.textContent = texts[index].title;
    if (descEls.length > 1) {
      descEls[1].textContent = texts[index].desc;
    } else if (descEls.length > 0) {
      descEls[0].textContent = texts[index].desc;
    }
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  slides.forEach((video, i) => {
    video.addEventListener('ended', () => {
      current = (i + 1) % slides.length;
      showSlide(current);
    });
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      current = i;
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
// JS: 무한 루프 & 피크 효과 & 텍스트 동기화 전체코드
document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".slides-wrapper");
  const navItems = document.querySelectorAll(".nav-item");
  const originalSlides = Array.from(document.querySelectorAll(".slide2"));
  const slideWidth = 800;
  const peek = 80;

  // ✅ 슬라이드 복제 (무한 루프용)
  const firstClone = originalSlides[0].cloneNode(true);
  const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);
  wrapper.insertBefore(lastClone, originalSlides[0]);
  wrapper.appendChild(firstClone);

  const allSlides = document.querySelectorAll(".slide2");
  let currentIndex = 1;

  const moveTo = (index, transition = true) => {
    wrapper.style.transition = transition
      ? "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)"
      : "none";
    const moveX = index * slideWidth - peek;
    wrapper.style.transform = `translateX(-${moveX}px)`;
    currentIndex = index;
  };

  const updateUI = () => {
    const realIndex = (currentIndex - 1 + originalSlides.length) % originalSlides.length;

    navItems.forEach((nav, i) => nav.classList.toggle("active", i === realIndex));

    originalSlides.forEach((slide, i) => {
      const text = slide.querySelector(".slide2-text");
      if (text) {
        if (i === realIndex) {
          text.classList.remove("hidden");
        } else {
          text.classList.add("hidden");
        }
      }
    });
  };

  // ✅ 트랜지션 끝나면 위치 리셋
  wrapper.addEventListener("transitionend", () => {
    if (currentIndex === 0) {
      moveTo(originalSlides.length, false);
      updateUI();
    } else if (currentIndex === originalSlides.length + 1) {
      moveTo(1, false);
      updateUI();
    }
  });

  // ✅ nav 클릭 시
  navItems.forEach((nav, i) => {
    nav.addEventListener("click", () => {
      moveTo(i + 1);
      updateUI();
      resetAuto();
    });
  });

  const next = () => {
    let nextIndex = currentIndex + 1;

    moveTo(nextIndex);

    if (nextIndex !== originalSlides.length + 1) {
      updateUI();
    }
  };

  let auto = setInterval(next, 4000);
  const resetAuto = () => {
    clearInterval(auto);
    auto = setInterval(next, 4000);
  };

  // ✅ 초기 세팅
  moveTo(1, false);
  updateUI();
});



document.addEventListener("DOMContentLoaded", () => {
  ///////////////////////////////////////////////////////////////////// 네비바 로딩 및 이벤트 바인딩
  
  fetch("navbar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar-container").innerHTML = data;

    const navbar = document.getElementById('navbar'); // 여기 꼭 추가!

    let lastScrollY = window.scrollY;
    let ticking = false;

    window.mouseY = 0;
    document.addEventListener('mousemove', e => {
      window.mouseY = e.clientY;
    });

    function updateNavbar() {
      const currentScrollY = window.scrollY;

      if (window.mouseY <= 100) {
        // 마우스가 상단 근처면 무조건 보이기
        navbar.classList.remove('hidden');
      } else if (currentScrollY > lastScrollY) {
        // 스크롤 내림 → 숨김
        navbar.classList.add('hidden');
      } else {
        // 스크롤 올림 → 보임
        navbar.classList.remove('hidden');
      }

      lastScrollY = currentScrollY;
      ticking = false;
    }

       window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(updateNavbar);
          ticking = true;
        }
      });
    

    /* ===== ▼▼▼ 하단 메뉴 드롭다운 기능 전체 비활성화 ▼▼▼ ===== */

    /*
    const dropdowns = document.querySelectorAll('.dropdown');
    let currentPanel = null;   // 현재 열려 있는 하단 메뉴 (.dropdown-panel)
    let hideTimeout = null;    // 하단 메뉴 닫기 타이머

    function showPanel(panel) {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }

      if (currentPanel && currentPanel !== panel) {
        currentPanel.style.opacity = '0';
        currentPanel.style.visibility = 'hidden';
        currentPanel.style.pointerEvents = 'none';
        currentPanel.parentElement.classList.remove('active');
      }

      panel.style.display = 'flex';
      requestAnimationFrame(() => {
        panel.style.opacity = '1';
        panel.style.visibility = 'visible';
        panel.style.pointerEvents = 'auto';
      });

      panel.parentElement.classList.add('active');
      currentPanel = panel;
    }

    function hidePanel(panel) {
      panel.style.opacity = '0';
      panel.style.visibility = 'hidden';
      panel.style.pointerEvents = 'none';
      panel.style.display = 'none';

      if (currentPanel === panel) currentPanel = null;

      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }

      panel.parentElement.classList.remove('active');
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
    */

    /* ===== ▲▲▲ 하단 메뉴 드롭다운 기능 전체 비활성화 ▲▲▲ ===== */
  


    
    // ✅ 기존 스크롤 처리 로직 이어붙이기

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
//////////////////section4////////////////////////
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

/////////////////////////////////about.html 탭, 통합 Observer/////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  let historyObserverInitialized = false;

  // 탭 버튼 클릭 이벤트
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      // 탭 버튼 active 토글
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // 탭 내용 active 토글
      tabContents.forEach(tab => {
        tab.classList.remove('active');
      });
      const targetTab = document.getElementById(targetId);
      targetTab.classList.add('active');

      // 연혁 탭 열릴 때만 observer 실행 (단, 한 번만)
      if (targetId === 'tab4' && !historyObserverInitialized) {
        initHistoryObserver();
        historyObserverInitialized = true;
      }
    });
  });

  // 연혁 관찰 함수
  function initHistoryObserver() {
    const yearFixed = document.getElementById('year-fixed');
    const items = document.querySelectorAll('.history-item');

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    let visibleItems = [];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const year = entry.target.dataset.year;
        if (entry.isIntersecting) {
          visibleItems.push(entry.target);
        } else {
          visibleItems = visibleItems.filter(el => el !== entry.target);
        }
      });

      if (visibleItems.length > 0) {
        const center = window.innerHeight / 2;
        let closest = visibleItems[0];
        let closestDistance = Math.abs(closest.getBoundingClientRect().top - center);

        visibleItems.forEach(el => {
          const dist = Math.abs(el.getBoundingClientRect().top - center);
          if (dist < closestDistance) {
            closest = el;
            closestDistance = dist;
          }
        });

        const currentYear = closest.dataset.year;
        yearFixed.textContent = currentYear;
      }
    }, observerOptions);

    items.forEach(item => observer.observe(item));
  }
});