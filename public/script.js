window.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll('.slide');
  const texts = [
    {desc: "사람과 기술이 함께 만드는 내일", title: "사람과 함께 진화하는 AI" },
    {desc: "모든 연결의 중심, 모든 혁신의 시작", title: "클라우드로 연결된 새로운 세상" },
    {desc: "에너지를 읽고, 미래를 예측하는 기술" , title: "데이터가 움직이는 에너지의 미래"},
  ];

  const titleEl = document.querySelector('.slide-text h1');
  const descEls = document.querySelectorAll('.slide-text p');
  const dots = document.querySelectorAll('.slide-dot'); const slideText = document.querySelector('.slide-text');

  let current = 0;

  function showSlide(index) {
    slides.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });

    // 텍스트 내용 바꾸기
    titleEl.textContent = texts[index].title;
    if (descEls.length > 1) {
      descEls[1].textContent = texts[index].desc;
    } else if (descEls.length > 0) {
      descEls[0].textContent = texts[index].desc;
    }

    // 애니메이션 트리거: remove → reflow → add
    slideText.classList.remove('active');
    void slideText.offsetWidth;
    slideText.classList.add('active');

    // 인디케이터 처리
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
}


  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      current = i;
      showSlide(current);
    });
  });
  setInterval(() => {
  current = (current + 1) % slides.length;
  showSlide(current);
}, 5000); // 5초마다 전환

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




  //////////////////////section2////////////////////
container.addEventListener('scroll', function () 
{ const boxes = document.querySelectorAll('.content-box'); 
  boxes.forEach(box => { const boxTop = box.getBoundingClientRect().top; 
  const triggerPoint = container.clientHeight * 0.85;
  if (boxTop < triggerPoint) { box.classList.add('visible'); 

  } 
}); 
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
  const scroller         = document.querySelector('.scroll-container');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  const yearFixed = document.getElementById('year-fixed');
  const historyWrapper = document.querySelector('.history-wrapper');
  const historyItems = document.querySelectorAll('.history-item');

  const tab4 = document.getElementById('tab4');
  
  const locationTabs = document.querySelectorAll('.tab-titles li');
  const locationContents = document.querySelectorAll('.tab-page');
  let isHeadquartersMapRendered = false;


  let historyObserverInitialized = false;

  // 탭 버튼 클릭 이벤트 처리
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabContents.forEach(tab => tab.classList.remove('active'));
      const targetTab = document.getElementById(targetId);
      targetTab.classList.add('active');

      if (targetId === 'tab4') {
        yearFixed.style.display = 'block';
        if (!historyObserverInitialized) {
          initHistoryObserver();
          historyObserverInitialized = true;
        }
      } else {
        yearFixed.style.display = 'none';
      }
    });
  });


  // IntersectionObserver 초기 설정
  function initHistoryObserver() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      const visibleItems = entries
        .filter(entry => entry.isIntersecting)
        .map(entry => entry.target);

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
        revealHistoryLinesForItem(closest);
      }
    }, observerOptions);

    historyItems.forEach(item => observer.observe(item));
  }

  // 초기 탭 상태 확인
  if (tab4.classList.contains('active')) {
    yearFixed.style.display = 'block';
    if (!historyObserverInitialized) {
      initHistoryObserver();
      historyObserverInitialized = true;
    }
  } else {
    yearFixed.style.display = 'none';
  }



function revealHistoryLinesForItem(itemElement) {
  const lines = itemElement.querySelectorAll('.history-line');
  lines.forEach((line, index) => {
    setTimeout(() => {
      line.classList.add('appear');
    }, index * 280); // 줄별로 순차적 등장
  });
  
}
 

});
 document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  let isLocationMapRendered = false;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      // 탭 콘텐츠 토글 (기존 코드)
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.tab-content')
        .forEach(tab => tab.classList.remove('active'));
      document.getElementById(targetId).classList.add('active');

      // 탭6(오시는 길) 클릭 시 지도 렌더링
      if (targetId === 'tab6' && !isLocationMapRendered) {
        new daum.roughmap.Lander({
          timestamp: "1753150882253",
          key: "62v9fb9ymb7",
          mapWidth: "700",
          mapHeight: "360"
        }).render();
        new daum.roughmap.Lander({
        "timestamp" : "1753157246325",
        "key" : "t8u8t4hfjae",
        "mapWidth" : "700",
        "mapHeight" : "360"
      }).render();

        isLocationMapRendered = true;
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // recruitsection2 영역 애니메이션
  const recruitSection = document.querySelector('#recruitsection2');

  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.3 });

  sectionObserver.observe(recruitSection);

  // text-table 각각 애니메이션
  const tables = document.querySelectorAll('.text-table');

  const tableObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.3 });

  tables.forEach(table => tableObserver.observe(table));
});

/************************************************공지사항 게시판************************************************* */
window.addEventListener('DOMContentLoaded', () => {
  const notices = [
    { category: '공지', title: '신규 사무실 오픈 안내', date: '2025.07.20' },
  { category: '뉴스', title: 'AI 연구팀 글로벌 컨퍼런스 참가', date: '2025.07.18' },
  { category: '공지', title: '2025 하반기 인턴 모집 공고', date: '2025.07.15' },
  { category: '개편', title: '웹사이트 디자인 리뉴얼 완료', date: '2025.07.10' },
  { category: '뉴스', title: '에너지 관리 시스템 해외 수출 계약', date: '2025.07.05' },
  { category: '행사', title: '2025 여름 워크숍 개최 안내', date: '2025.07.01' },
  { category: '개편', title: '모바일 앱 기능 업데이트 적용', date: '2025.06.28' },
  { category: '뉴스', title: 'Lemonsoft, 메타버스 스타트업 투자', date: '2025.06.25' },
  { category: '공지', title: '보안 강화 점검 예정 안내', date: '2025.06.20' },
  { category: '행사', title: '직원 건강검진 실시 안내', date: '2025.06.15' },
    { category: '공지', title: '사무실 이전 관련 공지', date: '2025.04.28' },
    { category: '뉴스', title: 'AI 기반 에너지 관리 솔루션 출시', date: '2025.04.22' },
    { category: '공지', title: '상반기 채용 일정 안내', date: '2025.04.10' },
    { category: '개편', title: '플랫폼 정기 점검 안내', date: '2025.04.07' },
    { category: '뉴스', title: '협업 시스템 특허 등록', date: '2025.03.30' },
    { category: '행사', title: 'K-ICT 2025 전시회 참가', date: '2025.03.21' },
    { category: '개편', title: '고객 포털 보안 강화 안내', date: '2025.03.10' },
    { category: '뉴스', title: '클라우드 연동 솔루션 해외 진출', date: '2025.03.01' },
    { category: '공지', title: '설 연휴 고객센터 운영 안내', date: '2025.02.05' },
    { category: '행사', title: '사내 해커톤 개최 안내', date: '2025.01.28' },
    
  ];

  const noticesPerPage = 10;
  let currentPage = 1;

  function renderNotices() {
    const list = document.getElementById('notice-list');
    list.innerHTML = '';

    const start = (currentPage - 1) * noticesPerPage;
    const end = start + noticesPerPage;
    const pageItems = notices.slice(start, end);

    pageItems.forEach((notice, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="category ${notice.category}">[${notice.category}]</span>
        <span class="title">${notice.title}</span>
        <span class="date">${notice.date}</span>
      `;
      li.onclick = () => showNotice(start + index);
      list.appendChild(li);
    });
  }

  function renderPagination() {
    const totalPages = Math.ceil(notices.length / noticesPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      if (i === currentPage) btn.classList.add('active');
      btn.onclick = () => {
        currentPage = i;
        renderNotices();
        renderPagination();
      };
      pagination.appendChild(btn);
    }
  }

  function showNotice(index) {
    const detail = document.getElementById('notice-detail');
    const item = notices[index];
    detail.innerHTML = `
      <h3>${item.title}</h3>
      <p><strong>분류:</strong> ${item.category}</p>
      <p><strong>날짜:</strong> ${item.date}</p>
      <p>여기에 상세 내용을 작성할 수 있습니다.</p>
    `;
  }

  renderNotices();
  renderPagination();
});

