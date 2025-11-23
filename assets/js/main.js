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
            const increment = Math.floor(Math.random() * 8) + 1;
            
            currentVal += increment;

            counterElement.innerText = formatCount(currentVal);

            localStorage.setItem(STORAGE_KEY, currentVal);

            const nextUpdateIn = Math.floor(Math.random() * 4000) + 3000;
            setTimeout(updateCounter, nextUpdateIn);
        };

       
        setTimeout(updateCounter, 4000);
    }

});