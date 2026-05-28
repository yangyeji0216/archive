const artworks = document.querySelectorAll('.artwork');
const tooltip = document.getElementById('tooltip');

artworks.forEach(artwork => {
    // 1. 무작위 위치 설정 (기존 코드 유지)
    artwork.style.top = Math.random() * 85 + '%'; 
    artwork.style.left = Math.random() * 80 + '%'; 

    // --- 드래그 앤 드롭 기능 추가 코드 ---
    let isDragging = false;
    let startX, startY;
    let initialLeft, initialTop;

    artwork.addEventListener('mousedown', (e) => {
        // 이미지 자체를 드래그하는 브라우저 기본 동작 방지
        e.preventDefault(); 
        
        isDragging = true;
        artwork.style.cursor = 'grabbing'; // 잡은 모양 커서로 변경

        // 마우스 클릭 시점의 커서 위치 저장
        startX = e.clientX;
        startY = e.clientY;

        // 현재 작품의 실제 위치(px) 가져오기
        const rect = artwork.getBoundingClientRect();
        // 부모(.gallery)는 scroll이 되므로 scrollY를 더해 절대적인 위치 계산
        initialLeft = rect.left + window.scrollX;
        initialTop = rect.top + window.scrollY;

        // 드래그 중에는 툴팁을 잠시 숨김
        tooltip.style.display = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        // 마우스가 움직인 거리 계산
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        // 새로운 위치를 px 단위로 적용 (기존 % 단위에서 px 단위로 전환됨)
        artwork.style.left = (initialLeft + dx) + 'px';
        artwork.style.top = (initialTop + dy) + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            artwork.style.cursor = 'pointer'; // 원래 커서로 복구
        }
    });
    // ------------------------------------

    // 2. 마우스 오버 이벤트 (드래그 중이 아닐 때만 작동하도록 조건문 추가)
    artwork.addEventListener('mouseover', (e) => {
        if (isDragging) return; 
        tooltip.innerText = artwork.getAttribute('data-description');
        tooltip.style.display = 'block';
        tooltip.style.left = e.pageX + 'px';
        tooltip.style.top = e.pageY + 'px';
    });

    // 3. 마우스 이동 이벤트 (툴팁이 마우스를 따라다님)
    artwork.addEventListener('mousemove', (e) => {
        if (isDragging) return;
        tooltip.style.left = e.pageX + 10 + 'px'; 
        tooltip.style.top = e.pageY + 10 + 'px';
    });

    // 4. 마우스 아웃 이벤트
    artwork.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
    });
});

// 5. 마우스 휠 스크롤 시 배경 이미지가 움직이는 로직 (기존 코드 유지)
window.addEventListener('scroll', () => {
    const background = document.querySelector('.background');
    if (!background) return;
    
    const scrollTop = window.scrollY;
    const speed = 0.2; 
    const yPos = scrollTop * speed;
    
    background.style.transform = `translateY(${-yPos}px)`; 
});
