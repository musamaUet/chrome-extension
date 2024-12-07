if (isLinkedIn()) {
    initElements();
    initStorage();
} else {
    console.log("You are not on LinkedIn.");
}

function initStorage() {
    
    chrome.runtime.sendMessage({ action: 'initStorage' });
}

function initElements() {
    
    const popupDiv = createPopupDiv();
    const toggleButton = createToggleButton();
    const applyButton = createApplyButton();
    const helpButton = createHelpButton();
    toggleButton.addEventListener('click', () => {
        togglePopupHeight(popupDiv, toggleButton, applyButton, helpButton);
    });

    helpButton.addEventListener('click', () => {
        window.open('https://multipleremotejobs.com/pages/plugin', '_blank');
    });

    let runningScript;
    applyButton.addEventListener('click', async () => {
        runningScript = true;
        const currentUrl = window.location.href.includes("www.linkedin.com/jobs/search")
        if (!currentUrl) {
            createNotOnJobSearchAlert()
        }
        else {
            chrome.storage.sync.get(null, async function(result) {
                console.log('default-sync Feidsl', result);
                if(result.userDetails) {
                    console.log('Yes, we have result', result.userDetails);
                    await runScript();
                }
            })
        }
    });

    // Append elements to the document
    document.body.appendChild(popupDiv);
    popupDiv.appendChild(toggleButton);
    popupDiv.appendChild(applyButton);
    popupDiv.appendChild(helpButton);
}

function createNotOnJobSearchAlert() {
    const overlay = document.createElement('div');
    overlay.id = 'customAlertOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;

    const modal = document.createElement('div');
    modal.id = 'customAlertModal';
    modal.style.cssText = `
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    `;

    const title = document.createElement('h3');
    title.innerHTML = `<b>Please navigate to jobs search page</b>`;
    title.style.marginBottom = '10px';

    const message = document.createElement('p');
    const jobSearchButtonContainer = document.createElement('div');
    jobSearchButtonContainer.style.marginTop = '15px';

    const jobSearchButton = document.createElement('button');
    jobSearchButton.innerHTML = `
        <i class="fas fa-search"></i> <b>Go To Job Search</b>
    `;
    jobSearchButton.style.cssText = `
        background-color: #2196F3;
        color: white;
        padding: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    `;

    jobSearchButton.onclick = () => window.location.href = 'https://www.linkedin.com/jobs/search';
    jobSearchButtonContainer.appendChild(jobSearchButton);
    message.appendChild(jobSearchButtonContainer);

    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.justifyContent = 'center';
    buttonsContainer.style.marginTop = '15px';

    const okButtonContainer = document.createElement('div');
    const okButton = document.createElement('button');
    okButton.textContent = 'OK';
    okButton.style.cssText = `
        margin-right: 5px;
        padding: 10px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    `;

    okButton.onclick = closeCustomAlert;
    okButtonContainer.appendChild(okButton);
    buttonsContainer.appendChild(okButtonContainer);

    const helpButtonContainer = document.createElement('div');
    const helpButton = document.createElement('button');
    helpButton.textContent = 'Help';
    helpButton.style.cssText = `
        margin-left: 10px;
        padding: 10px;
        background-color: #FFA500;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    `;

    helpButton.onclick = () => window.open('https://multipleremotejobs.com/pages/plugin', '_blank');
    helpButtonContainer.appendChild(helpButton);
    buttonsContainer.appendChild(helpButtonContainer);
    modal.appendChild(title);
    modal.appendChild(message);
    modal.appendChild(buttonsContainer);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}

function closeCustomAlert() {
    const overlay = document.getElementById('customAlertOverlay');
    if (overlay) {
        overlay.remove();
    }
}

// Function to create the popup div
function createPopupDiv() {
    const popupDiv = document.createElement('div');
    popupDiv.style.cssText = `
        position: fixed;
        top: 50%;
        right: 10px;
        transform: translate(0, -50%);
        background-color: #0077B5;
        color: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        height: auto;
        max-height: 200px;
        transition: all 0.3s;
    `;
    return popupDiv;
}

// Function to create the "Run Auto Apply" button
function createApplyButton() {
    const applyButton = document.createElement('button');
    applyButton.textContent = 'Run Auto Apply';
    applyButton.style.cssText = `
        margin-right: 5px;
        background-color: #fff;
        color: #0077B5.;
        padding: 10px;
        border: 1px solid #FFFFFF;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 10px;
        font-weight: bold;
    `;
    return applyButton;
}

// Function to create the toggle button
function createToggleButton() {
    const toggleButton = document.createElement('button');
    toggleButton.textContent = '▼';
    toggleButton.style.cssText = `
        background-color: #fff;
        color: #0077B5.;
        padding: 5px;
        border: 1px solid #FFFFFF;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 5px;
        margin-bottom: 10px;
    `;
    return toggleButton;
}

// Function to create the help button
function createHelpButton() {
    const helpButton = document.createElement('button');
    helpButton.textContent = '?';
    helpButton.style.cssText = `
        background-color: #fff;
        color: #ff0000;
        padding: 5px;
        border: 1px solid #ff0000;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 10px;
    `;
    return helpButton;
}

function togglePopupHeight(popupDiv, toggleButton, applyButton, helpButton) {
    if (popupDiv.style.height === 'auto' || popupDiv.style.height === '') {
        popupDiv.style.height = '50px';
        toggleButton.textContent = '▲';
        applyButton.style.display = 'none';
        helpButton.style.display = 'none';
    } else {
        popupDiv.style.height = 'auto';
        toggleButton.textContent = '▼';
        applyButton.style.display = 'inline-block';
        helpButton.style.display = 'inline-block';
    }
}