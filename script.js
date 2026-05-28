const artworks = document.querySelectorAll('.artwork');
const tooltip = document.getElementById('tooltip');

artworks.forEach(artwork => {
    // 무작위 위치 설정
    artwork.style.top = Math.random() * 80 + 'vh'; // 0~80% 랜덤 y 위치
    artwork.style.left = Math.random() * 80 + 'vw'; // 0~80% 랜덤 x 위치

    // 마우스 오버 이벤트
    artwork.addEventListener('mouseover', (e) => {
        tooltip.innerText = artwork.getAttribute('data-description');
        tooltip.style.display = 'block';
        tooltip.style.left = e.pageX + 'px';
        tooltip.style.top = e.pageY + 'px';
    });

    // 마우스 아웃 이벤트
    artwork.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
    });
});
