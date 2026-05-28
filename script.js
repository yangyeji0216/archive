const artworks = document.querySelectorAll('.artwork');
const tooltip = document.getElementById('tooltip');

artworks.forEach(artwork => {
    // 🌟 수정: 0% ~ 85% 사이의 랜덤 위치로 설정 (늘어난 갤러리 높이 전체를 활용)
    // 부모인 .gallery 높이가 250vh로 늘어났기 때문에, %를 쓰면 알아서 아래쪽까지 넓게 퍼집니다.
    artwork.style.top = Math.random() * 85 + '%'; 
    artwork.style.left = Math.random() * 80 + '%'; 

    // 마우스 오버 이벤트
    artwork.addEventListener('mouseover', (e) => {
        tooltip.innerText = artwork.getAttribute('data-description');
        tooltip.style.display = 'block';
        tooltip.style.left = e.pageX + 'px';
        tooltip.style.top = e.pageY + 'px';
    });

    // 마우스 이동 이벤트 추가 (마우스를 움직일 때 툴팁이 커서를 따라다니게 함)
    artwork.addEventListener('mousemove', (e) => {
        tooltip.style.left = e.pageX + 10 + 'px'; // 커서에 딱 붙지 않게 살짝 여백(+10)
        tooltip.style.top = e.pageY + 10 + 'px';
    });

    // 마우스 아웃 이벤트
    artwork.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
    });
});

// 🌟 추가: 마우스 휠 스크롤 시 배경 이미지가 움직이는 로직
window.addEventListener('scroll', () => {
    const background = document.querySelector('.background');
    if (!background) return; // 배경 이미지가 없으면 에러 방지
    
    const scrollTop = window.scrollY;
    
    // 0.2는 배경이 움직이는 속도입니다. 
    // 스크롤을 내릴 때 배경이 '위로' 슬금슬금 올라가게 하고 싶다면 -yPos를 사용하세요.
    // 만약 배경이 '아래로' 내려가게 하고 싶다면 마이너스를 지우고 그냥 yPos를 사용하세요!
    const speed = 0.2; 
    const yPos = scrollTop * speed;
    
    background.style.transform = `translateY(${-yPos}px)`; 
});
