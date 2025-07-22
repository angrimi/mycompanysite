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

    titleEl.textContent = texts[index].title;
    if (descEls.length > 1) {
      descEls[1].textContent = texts[index].desc;
    } else if (descEls.length > 0) {
      descEls[0].textContent = texts[index].desc;
    }

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
      slideText.classList.remove('active');      // 기존 active 제거
      void slideText.offsetWidth;                 // 리플로우 강제 발생 (애니메이션 초기화)
      slideText.classList.add('active');         // active 다시 붙이기 (애니메이션 재시작)
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

//////////////////////section0////////////////////
/*document.addEventListener("DOMContentLoaded", function () {
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
  });*/
  //////////////////////section0->section2////////////////////
  



  //////////////////////section2////////////////////
const projects = [
  {
    title: "AI 기반 분석 프로젝트",
    subtitleTop: "기술 융합 플랫폼",
    subtitleBottom: "#AI API    #메타버스   #에너지 프로젝트    #AR 가술",
    description: `레몬소프트의 IT 전문 기술은 AI, 메타버스, 에너지 솔루션, 증강현실 등 다양한 첨단 기술을 융합하여 사용자의 삶을 더 편리하고 스마트하게 만들어갑니다. 
    끊임없는 기술 연구와 혁신을 통해 미래를 선도하는 디지털 환경을 구축합니다. 끊임없는 기술 연구와 개발을 통해 변화하는 디지털 패러다임에 선도적으로 대응하며, 
    고객과 사회에 실질적인 가치를 제공하는 지속 가능한 IT 파트너로서의 비전을 실현해가고 있습니다.`,
    mediaType: "video",
    mediaSrc: "images/project11.mp4"
  },
  {
    title: "스마트 에너지 플랫폼",
    subtitleTop: "기술 융합 플랫폼",
    subtitleBottom: "#AI   #메타버스  #에너지  #AR",
    description: `레몬소프트의 IT 전문 기술은 AI, 메타버스, 에너지 솔루션, 증강현실 등 다양한 첨단 기술을 융합하여 사용자의 삶을 더 편리하고 스마트하게 만들어갑니다. 
    끊임없는 기술 연구와 혁신을 통해 미래를 선도하는 디지털 환경을 구축합니다. 끊임없는 기술 연구와 개발을 통해 변화하는 디지털 패러다임에 선도적으로 대응하며, 
    고객과 사회에 실질적인 가치를 제공하는 지속 가능한 IT 파트너로서의 비전을 실현해가고 있습니다.`,
    mediaType: "image",
    mediaSrc: "images/project2.png"
  },
  {
    title: "VR 산업교육 시스템",
    subtitleTop: "기술 융합 플랫폼",
    subtitleBottom: "#AI   #메타버스   #에너지   #AR",
    description: `레몬소프트의 IT 전문 기술은 AI, 메타버스, 에너지 솔루션, 증강현실 등 다양한 첨단 기술을 융합하여 사용자의 삶을 더 편리하고 스마트하게 만들어갑니다. 
    끊임없는 기술 연구와 혁신을 통해 미래를 선도하는 디지털 환경을 구축합니다. 끊임없는 기술 연구와 개발을 통해 변화하는 디지털 패러다임에 선도적으로 대응하며, 
    고객과 사회에 실질적인 가치를 제공하는 지속 가능한 IT 파트너로서의 비전을 실현해가고 있습니다.`,
    mediaType: "video",
    mediaSrc: "images/project1.mp4"
  }
];

// ✅ 이 조건문으로 index.html에서만 작동하도록 제한
const leftBtn = document.querySelector(".left-arrow");
const rightBtn = document.querySelector(".right-arrow");
const desc = document.querySelector(".project-description");
const media = document.querySelector(".project-media");

if (leftBtn && rightBtn && desc && media) {
  let current = 0;

  function updateProject(index) {
    const p = projects[index];

    desc.classList.add("fade-out");
    media.classList.add("fade-out");

    setTimeout(() => {
      desc.innerHTML = `
        <small class="subtitle-top">${p.subtitleTop}</small>
        <h3>${p.title}</h3>
        <h4 class="subtitle-bottom">${p.subtitleBottom}</h4>
        <p>${p.description}</p>
      `;

      if (p.mediaType === "video") {
        media.innerHTML = `<video src="${p.mediaSrc}" controls></video>`;
      } else if (p.mediaType === "image") {
        media.innerHTML = `<img src="${p.mediaSrc}" alt="${p.title} 이미지">`;
      }

      desc.classList.remove("fade-out");
      media.classList.remove("fade-out");
    }, 300);
  }

  leftBtn.addEventListener("click", () => {
    current = (current - 1 + projects.length) % projects.length;
    updateProject(current);
  });

  rightBtn.addEventListener("click", () => {
    current = (current + 1) % projects.length;
    updateProject(current);
  });

  updateProject(current);
}

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