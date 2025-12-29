document.addEventListener('DOMContentLoaded', function () {

    // Slider Functionality
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    // Only initialize slider if slides exist
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 5000; // 5 seconds

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Handle wrap-around
            if (index >= slides.length) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = slides.length - 1;
            } else {
                currentSlide = index;
            }

            if (slides[currentSlide]) slides[currentSlide].classList.add('active');
            if (dots[currentSlide]) dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        // Event Listeners for Slider
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });

        // Auto-play
        let autoPlay = setInterval(nextSlide, slideInterval);

        // Pause on hover
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(autoPlay);
            });
            sliderContainer.addEventListener('mouseleave', () => {
                autoPlay = setInterval(nextSlide, slideInterval);
            });
        }
    }

    // Scroll to Top
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Header Interaction
    const headerWrap = document.querySelector('.header_wrap');
    const gnb = document.querySelector('.gnb');
    const gnbBg = document.querySelector('.gnb_bg');

    // Hover effect for Mega Menu
    gnb.addEventListener('mouseenter', () => {
        headerWrap.classList.add('on');
    });

    headerWrap.addEventListener('mouseleave', () => {
        headerWrap.classList.remove('on');
    });

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            headerWrap.classList.add('active');
        } else {
            headerWrap.classList.remove('active');
        }
    });


    const gnbMenuHTML = `
    <ul>
        <li class="has-submenu">
            <a href="index_service_migration.html">Service</a>
            <ul class="gnb_sub">
                <li><a href="index_service_migration.html">전환(Migration) 및 전환 자동화</a></li>
                <li><a href="index_service_aqt.html">테스트 자동화 (AQT Platform)</a></li>
                <li><a href="index_service_dr.html">DR 자동화 (Sanovi 기반)</a></li>
                <li><a href="index_service_iot.html">산업용 IoT 솔루션 (Bird Series)</a></li>
                
            </ul>
        </li>
        <li class="has-submenu">
            <a href="index_solution_aqt.html">Solution</a>
            <ul class="gnb_sub">
                <li><a href="index_solution_aqt.html">AQT</a></li>
                <li><a href="index_solution_asw.html">ASW</a></li>
                <li><a href="index_solution_dr.html">DRM</a></li>
                <li><a href="index_solution_iot_prod.html">IoT</a></li>
            </ul>
        </li>
        <li class="has-submenu">
            <a href="index_reference.html">Reference</a>
            <ul class="gnb_sub">
                <li><a href="index_reference.html">주요사업실적</a></li>
                <li><a href="index_reference.html#features">주요 파트너 및 고객사</a></li>
            </ul>
        </li>
        <li class="has-submenu">
            <a href="index_about.html">About us</a>
            <ul class="gnb_sub">
            <li><a href="index_about.html#vision">CEO 인사말</a></li>    
            <li><a href="index_about.html#history">주요 연혁</a></li>
                <li><a href="index_about.html#contact">오시는 길</a></li>
            </ul>
        </li>
    </ul>
`;

    // 메뉴 컨테이너에 HTML을 삽입합니다.
    const gnbContainer = document.getElementById('gnb');
    if (gnbContainer) {
        gnbContainer.innerHTML = gnbMenuHTML;
    }

    // 서브 메뉴 토글 기능을 위한 JavaScript
    // 모든 서브 메뉴 부모 항목을 선택합니다.
    const menuItems = document.querySelectorAll('.gnb > ul > li.has-submenu');

    menuItems.forEach(item => {
        // 마우스가 들어왔을 때 'active' 클래스 추가 (CSS에서 사용)
        item.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                // 다른 모든 아이템의 active 제거 (메뉴 간 빠른 이동 시 즉시 전환)
                menuItems.forEach(other => other.classList.remove('active'));
                item.classList.add('active');
            }
        });

        // 모바일에서 클릭 시 서브메뉴 토글
        const link = item.querySelector('a');
        if (link) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault(); // 링크 이동 방지
                    e.stopPropagation(); // 이벤트 버블링 방지
                    // 다른 열린 메뉴 닫기 (선택 사항)
                    menuItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    item.classList.toggle('active');
                }
            });
        }
    });

    // 헤더 영역 전체에서 나갈 때 모든 서브메뉴 닫기
    if (headerWrap) {
        headerWrap.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                menuItems.forEach(item => item.classList.remove('active'));
            }
        });
    }

    // ---------------------------------------------------------
    // Mobile Hamburger Menu Injection (Responsive)
    // ---------------------------------------------------------
    function initMobileMenu() {
        // 1. (Refactored) Styles moved to style.css

        // 2. Inject Hamburger Button
        const headerContainer = document.querySelector('#header .container');
        if (headerContainer) {
            // Prevent duplicate injection
            if (headerContainer.querySelector('.hamburger-btn')) return;

            const btn = document.createElement('button');
            btn.className = 'hamburger-btn';
            btn.innerHTML = '<span></span><span></span><span></span>';
            headerContainer.appendChild(btn);

            // 3. Inject Overlay
            const overlay = document.createElement('div');
            overlay.className = 'menu-overlay';
            document.body.appendChild(overlay);

            // 4. Logic
            const gnb = document.querySelector('.gnb');

            function toggleMenu() {
                btn.classList.toggle('active');
                gnb.classList.toggle('mobile-active');
                overlay.classList.toggle('active');

                // Toggle Logo Image
                const logoImg = document.querySelector('.logo img');
                if (gnb.classList.contains('mobile-active')) {
                    document.body.style.overflow = 'hidden'; // Lock scroll
                    if (logoImg) logoImg.src = 'assets/images/logo.png';
                } else {
                    document.body.style.overflow = ''; // Unlock scroll
                    if (logoImg) logoImg.src = 'assets/images/logo2.png';
                }
            }

            btn.addEventListener('click', toggleMenu);
            overlay.addEventListener('click', toggleMenu);

            // 5. Close menu when clicking a submenu link (essential for anchor links)
            const submenuLinks = document.querySelectorAll('.gnb_sub a');
            submenuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (gnb.classList.contains('mobile-active')) {
                        toggleMenu();
                    }
                });
            });
        }
    }

    // Initialize
    initMobileMenu();

    // Timeline Scroll Animation Logic
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

});

document.addEventListener('DOMContentLoaded', function () {
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(acc => {
        acc.addEventListener('click', function () {
            this.classList.toggle('active');
            const panel = this.nextElementSibling;

            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });
});



