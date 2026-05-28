const artworks = document.querySelectorAll('.artwork');
const tooltip = document.getElementById('tooltip');

artworks.forEach(artwork => {
    // 1. 무작위 위치 설정
    artwork.style.top = Math.random() * 85 + '%'; 
    artwork.style.left = Math.random() * 80 + '%'; 

    let isDragging = false;
    let startX, startY;
    let initialLeft, initialTop;

    // --- [공통 이벤트] 드래그 시작 (PC 마우스 / 모바일 터치) ---
    function startDrag(e) {
        isDragging = true;
        artwork.style.cursor = 'grabbing';

        // PC(e.pageX)와 모바일(e.touches[0].pageX) 좌표 호환 처리
        const pageX = e.pageX || e.touches[0].pageX;
        const pageY = e.pageY || e.touches[0].pageY;

        startX = pageX;
        startY = pageY;

        initialLeft = artwork.offsetLeft;
        initialTop = artwork.offsetTop;

        // 모바일 터치 시 호버 효과(툴팁) 대용으로 사용
        showTooltip(pageX, pageY);
        
        // 브라우저 기본 스크롤/터치 동작 방지 (터치 시 화면이 출렁이는 것 방지)
        if (e.cancelable) e.preventDefault(); 
    }

    // --- [공통 이벤트] 드래그 중 ---
    function moveDrag(e) {
        if (!isDragging) return;

        const pageX = e.pageX || (e.touches && e.touches[0].pageX);
        const pageY = e.pageY || (e.touches && e.touches[0].pageY);

        if (!pageX || !pageY) return;

        const dx = pageX - startX;
        const dy = pageY - startY;

        artwork.style.left = (initialLeft + dx) + 'px';
        artwork.style.top = (initialTop + dy) + 'px';

        // 모바일에서 드래그할 때 툴팁이 손가락을 따라다니게 함
        showTooltip(pageX, pageY);
    }

    // --- [공통 이벤트] 드래그 종료 ---
    function endDrag() {
        if (isDragging) {
            isDragging = false;
            artwork.style.cursor = 'pointer';
            
            // 모바일에서는 손을 떼면 툴팁을 바로 숨김 (호버 종료 효과)
            if ('ontouchstart' in window) {
                hideTooltip();
            }
        }
    }

    // --- 툴팁 표시/숨김 함수 ---
    function showTooltip(x, y) {
        tooltip.innerText = artwork.getAttribute('data-description');
        tooltip.style.display = 'block';
        tooltip.style.left = x + 10 + 'px'; // 손가락/커서에 가리지 않게 살짝 여백
        tooltip.style.top = y + 10 + 'px';
    }

    function hideTooltip() {
        tooltip.style.display = 'none';
    }

    // 2. 이벤트 리스너 연결 (환경에 맞게 하이브리드로 작동)
    
    // PC 마우스용 이벤트
    artwork.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', moveDrag);
    document.addEventListener('mouseup', endDrag);

    // 모바일 터치용 이벤트 (★추가)
    artwork.addEventListener('touchstart', startDrag, { passive: false });
    document.addEventListener('touchmove', moveDrag, { passive: false });
    document.addEventListener('touchend', endDrag);

    // 3. PC 전용 마우스 호버 효과 (모바일에서는 무시됨)
    artwork.addEventListener('mouseover', (e) => {
        if (isDragging || 'ontouchstart' in window) return; 
        showTooltip(e.pageX, e.pageY);
    });

    artwork.addEventListener('mousemove', (e) => {
        if (isDragging || 'ontouchstart' in window) return;
        showTooltip(e.pageX, e.pageY);
    });

    artwork.addEventListener('mouseout', () => {
        if ('ontouchstart' in window) return;
        hideTooltip();
    });
});

// 배경 스크롤 효과
window.addEventListener('scroll', () => {
    const background = document.querySelector('.background');
    if (!background) return;
    
    const scrollTop = window.scrollY;
    const speed = 0.2; 
    const yPos = scrollTop * speed;
    
    background.style.transform = `translateY(${-yPos}px)`; 
});
