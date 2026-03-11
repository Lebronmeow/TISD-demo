document.addEventListener('DOMContentLoaded', () => {
    const applyBtn = document.getElementById('apply-btn');
    const extensionPopup = document.getElementById('extension-popup');
    const closePopupBtn = document.getElementById('close-popup');
    const extIconBtn = document.getElementById('job-analyzer-ext-btn');
    
    const analysisLoading = document.getElementById('analysis-loading');
    const analysisResults = document.getElementById('analysis-results');
    
    // Steps
    const steps = [
        { id: 'step-whois', delay: 1500, label: 'Checking Domain WHOIS' },
        { id: 'step-email', delay: 1200, label: 'Verifying Contact Email' },
        { id: 'step-govt', delay: 1800, label: 'Querying Govt Records' }
    ];

    applyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Change apply button text to show reaction
        applyBtn.innerText = 'Analyzing...';
        applyBtn.disabled = true;
        applyBtn.style.background = '#94a3b8';

        // Trigger extension animation
        extIconBtn.classList.add('analyzing');
        
        // Show popup
        extensionPopup.classList.remove('hidden');
        resetPopupState();
        
        // Start Analysis Process
        runAnalysisSimulation();
    });

    closePopupBtn.addEventListener('click', () => {
        extensionPopup.classList.add('hidden');
        applyBtn.innerText = 'Apply Now';
        applyBtn.disabled = false;
        applyBtn.style.background = '#2563eb';
        extIconBtn.classList.remove('analyzing');
        extIconBtn.classList.remove('active');
    });

    function resetPopupState() {
        analysisLoading.classList.remove('hidden');
        analysisResults.classList.add('hidden');
        
        steps.forEach(step => {
            const el = document.getElementById(step.id);
            el.className = 'step pending';
            el.innerHTML = `<i class="ph ph-circle"></i> ${step.label}`;
        });
    }

    async function runAnalysisSimulation() {
        // Run sequence
        for (const step of steps) {
            const el = document.getElementById(step.id);
            
            // Set to active
            el.className = 'step active';
            el.innerHTML = `<i class="ph ph-spinner ph-spin"></i> ${step.label}`;
            
            // Wait
            await sleep(step.delay);
            
            // Set to done
            el.className = 'step done';
            el.innerHTML = `<i class="ph ph-check-circle"></i> ${step.label}`;
        }
        
        // Finish analysis, show results
        setTimeout(() => {
            extIconBtn.classList.remove('analyzing');
            extIconBtn.classList.add('active');
            
            applyBtn.innerText = 'Analysis Complete';
            
            analysisLoading.classList.add('hidden');
            analysisResults.classList.remove('hidden');
            
            displayResults();
        }, 500);
    }

    function displayResults() {
        // Mock data for results (A score of 32% indicating a likely scam)
        const finalScore = 32; 
        
        const scoreCircle = document.getElementById('score-circle');
        const scoreText = document.getElementById('score-text');
        const scoreLabel = document.getElementById('score-label');
        
        // Update circle dash array (circumference is ~100)
        setTimeout(() => {
            scoreCircle.setAttribute('stroke-dasharray', `${finalScore}, 100`);
            scoreText.textContent = `${finalScore}%`;
        }, 100);

        // Determine styling based on score
        let color, label;
        if (finalScore >= 80) {
            color = 'var(--success-color)';
            label = 'Looks Legitimate';
        } else if (finalScore >= 50) {
            color = 'var(--warning-color)';
            label = 'Proceed with Caution';
        } else {
            color = 'var(--danger-color)';
            label = 'High Risk Detected';
        }

        scoreCircle.style.stroke = color;
        scoreText.style.fill = color;
        scoreLabel.textContent = label;
        scoreLabel.style.color = color;

        // Populate reasons
        const reasons = [
            {
                type: 'negative',
                icon: 'ph ph-warning-octagon',
                title: 'Domain Age Very Recent',
                desc: 'Domain registered less than 30 days ago. Scammers often use fresh domains.'
            },
            {
                type: 'negative',
                icon: 'ph ph-envelope-simple',
                title: 'Suspicious Email Provider',
                desc: 'Job listing points to a free generic email provider (@gmail.com) instead of corporate.'
            },
            {
                type: 'warning',
                icon: 'ph ph-bank',
                title: 'Govt Records Mismatch',
                desc: 'Business entity "Nexus Global Tech Solutions LLC" not found in official state registries.'
            },
            {
                type: 'positive',
                icon: 'ph ph-shield-check',
                title: 'Connection is Secure',
                desc: 'The website is using valid HTTPS and SSL certificates.'
            }
        ];

        const reasonList = document.getElementById('reason-list');
        reasonList.innerHTML = '';
        
        reasons.forEach(reason => {
            const li = document.createElement('li');
            li.className = `reason-item ${reason.type}`;
            li.innerHTML = `
                <i class="${reason.icon}"></i>
                <div class="reason-text">
                    <strong>${reason.title}</strong>
                    <span>${reason.desc}</span>
                </div>
            `;
            reasonList.appendChild(li);
        });
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
});
