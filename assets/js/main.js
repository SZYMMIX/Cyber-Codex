document.addEventListener('DOMContentLoaded', () => {

    const counterElement = document.querySelector('.death-counter .count');

    if (counterElement) {

        const STORAGE_KEY = 'cyber_death_count';
        const STARTING_DEATHS = 30;
        const formatCount = (num) => num.toString().padStart(4, '0');

        let savedCount = localStorage.getItem(STORAGE_KEY);
        let currentVal;

        if (savedCount) {
            currentVal = parseInt(savedCount, 10);
        } else {
            currentVal = STARTING_DEATHS;
        }

        counterElement.innerText = formatCount(currentVal);

        const updateCounter = () => {
            const increment = Math.floor(Math.random() * 4) + 1;
            
            currentVal += increment;

            counterElement.innerText = formatCount(currentVal);

            localStorage.setItem(STORAGE_KEY, currentVal);

            const nextUpdateIn = Math.floor(Math.random() * 4000) + 3000;
            setTimeout(updateCounter, nextUpdateIn);
        };

       
        setTimeout(updateCounter, 4000);
    }

    const moonContainer = document.querySelector('.moon-scroll-container');
    
    const textTogether = document.querySelector('.scene-together .moon-text');
    const imgTogether = document.querySelector('.scene-together .moon-visual');
    
    const textAlone = document.querySelector('.scene-alone .moon-text');
    const imgAlone = document.querySelector('.scene-alone .moon-visual');

    if (moonContainer && textTogether && imgTogether && textAlone && imgAlone) {
        window.addEventListener('scroll', () => {
            const containerTop = moonContainer.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const scrollDistance = moonContainer.offsetHeight - windowHeight;

            let progress = (containerTop * -1) / scrollDistance;

            if (progress < 0) progress = 0;
            if (progress > 1) progress = 1;

            imgTogether.style.opacity = 1 - progress;
            imgAlone.style.opacity = progress;

            let textOp1 = 1 - (progress * 2.2);
            
            let textOp2 = (progress - 0.55) * 2.2;

            textTogether.style.opacity = Math.max(0, Math.min(1, textOp1));
            textAlone.style.opacity    = Math.max(0, Math.min(1, textOp2));
        });
    }
});