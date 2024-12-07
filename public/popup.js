const settingsButton = document.getElementById('settings-button');
settingsButton.addEventListener('click', function() {
    chrome.tabs.create({ url: 'settings.html' });
});

const defaultButton = document.getElementById('default-button');
defaultButton.addEventListener('click', function() {
    chrome.tabs.create({ url: 'defaultInput.html' });
});
