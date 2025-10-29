document.addEventListener('DOMContentLoaded', () => {

    const loader = document.getElementById('loader');
    const animatedTextElement = document.querySelector('.animated-text');
    const leftChar = document.querySelector('.left-char');
    const rightChar = document.querySelector('.right-char');
    const contentSections = document.querySelectorAll('.content-section');

    // ===== 1. 初始載入動畫 =====
    window.addEventListener('load', () => {
        // 延遲一點時間讓動畫更自然
        setTimeout(() => {
            loader.classList.add('hidden');
            startHeroAnimation();
        }, 500);
    });

    // ===== 2. 主視覺動畫 (打字效果 + 角色登場) =====
    function startHeroAnimation() {
        // 找到所有的角色
    	const allCharacters = document.querySelectorAll('.character');

    	// 讓所有角色登場
    	setTimeout(() => {
            allCharacters.forEach(char => {
            	char.classList.add('visible');
            });
    	}, 200); // 延遲 200 毫秒後開始播放動畫

        // 文字逐字出現
        const text = "四資工一甲 41443150 劉聰明";
        let index = 0;
        if (animatedTextElement) {
            animatedTextElement.innerHTML = '';
            function type() {
                if (index < text.length) {
                    animatedTextElement.innerHTML += text.charAt(index);
                    index++;
                    setTimeout(type, 100); // 每個字出現的間隔 (毫秒)
                }
            }
            setTimeout(type, 800); // 延遲一點開始打字
        }
    }

    // ===== 3. 滾動觸發動畫 =====
    const observerOptions = {
        root: null, // 以 viewport 為基準
        rootMargin: '0px',
        threshold: 0.2 // 當元素 20% 進入畫面時觸發
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // 觸發後就不再觀察，避免重複動畫
            }
        });
    }, observerOptions);

    contentSections.forEach(section => {
        observer.observe(section);
    });
});