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

    const jobsDatabase = {
        streetkid: [
            {
                title: "Smuggle Run: Badlands",
                desc: "Transport unverified bio-goods across the border. Avoid border patrol drones. Fast driver needed. Dust storms expected.",
                reward: "3,000 €$"
            },
            {
                title: "Liquor Store Hit",
                desc: "6th Street gang is hoarding supplies. Hit their stash in Arroyo. Grab the cash, leave the booze. Don't kill unless necessary.",
                reward: "1,500 €$"
            },
            {
                title: "Cyber-psycho Bait",
                desc: "We need a distraction while MAX-TAC sets up. You run, he chases. Try not to die. High risk, high reward.",
                reward: "10,000 €$"
            }
        ],
        corpo: [
            {
                title: "Data Extraction: Militech",
                desc: "Infiltrate a subnet in the Downtown branch. Extract project 'Cynosure' files without triggering ICE. Stealth is mandatory.",
                reward: "25,000 €$"
            },
            {
                title: "Asset Liquidation",
                desc: "A junior executive is leaking secrets. Silence him permanently. Make it look like an accident. Clean hands only.",
                reward: "15,000 €$"
            },
            {
                title: "Industrial Espionage",
                desc: "Plant a listening device in the Biotechnica boardroom. No witnesses. You will be disavowed if caught.",
                reward: "8,000 €$"
            }
        ]
    };

    let currentPath = ''; 
    let currentJobIndex = 0;

    const viewSelection = document.getElementById('view-selection');
    const viewJobBoard = document.getElementById('view-job-board');
    const viewApplication = document.getElementById('view-application');
    
    const jobTitle = document.getElementById('job-title');
    const jobDesc = document.getElementById('job-desc');
    const jobReward = document.getElementById('job-reward');

    function switchView(viewToShow) {
        viewSelection.classList.add('hidden');
        viewJobBoard.classList.add('hidden');
        viewApplication.classList.add('hidden');

        viewToShow.classList.remove('hidden');
        window.scrollTo(0, 0);
    }

    function loadJobData() {
        const jobList = jobsDatabase[currentPath];
        const job = jobList[currentJobIndex];

        jobTitle.textContent = job.title;
        jobDesc.textContent = job.desc;
        jobReward.textContent = "REWARD: " + job.reward;
    }

    const pathButtons = document.querySelectorAll('.path-btn');
    pathButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentPath = e.target.getAttribute('data-path');
            currentJobIndex = 0;
            
            loadJobData();
            switchView(viewJobBoard); 
        });
    });

    const nextBtn = document.getElementById('next-job');
    const prevBtn = document.getElementById('prev-job');

    if(nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            const max = jobsDatabase[currentPath].length - 1;
            currentJobIndex++;
            if (currentJobIndex > max) currentJobIndex = 0;
            loadJobData();
        });

        prevBtn.addEventListener('click', () => {
            const max = jobsDatabase[currentPath].length - 1;
            currentJobIndex--;
            if (currentJobIndex < 0) currentJobIndex = max;
            loadJobData();
        });
    }

    const signupBtn = document.getElementById('signup-btn');
    if(signupBtn) {
        signupBtn.addEventListener('click', () => {
            const currentTitle = jobsDatabase[currentPath][currentJobIndex].title;
            document.getElementById('form-job-title').textContent = currentTitle;
            
            switchView(viewApplication);
        });
    }

    const backFromBoard = viewJobBoard.querySelector('.back-tab');
    
    if(backFromBoard) {
        backFromBoard.addEventListener('click', () => {
            switchView(viewSelection);
        });
    }

    const backFromForm = viewApplication.querySelector('.back-arrow');
    if(backFromForm) {
        backFromForm.addEventListener('click', () => {
            switchView(viewJobBoard);
        });
    }

    const form = document.getElementById('faction-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("DATA UPLOADED TO THE NET. FIXER WILL CONTACT YOU.");
            form.reset();
            switchView(viewSelection);
        });
    }
});