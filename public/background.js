/* eslint-disable no-undef */

const inputFieldConfigs = [];
let currentInputFieldConfigs = [];

// Add listeners for handling various actions
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "SAVE_DETAILS") {
        // Save the details (e.g., in localStorage or Chrome Storage)
        chrome.storage.sync.set({ userDetails: message.details }, () => {
            if (chrome.runtime.lastError) {
                sendResponse({ success: false, error: chrome.runtime.lastError.message });
            } else {
                sendResponse({ success: true, message: "Details saved successfully" });
            }
        });
        return true; // Indicates async response
    }

    if (message.type === "GET_DETAILS") {
        chrome.storage.sync.get("userDetails", (result) => {
            if (chrome.runtime.lastError) {
                sendResponse({ success: false, error: chrome.runtime.lastError.message });
            } else {
                sendResponse({ success: true, details: result.userDetails || {} });
            }
        });
        return true; // Indicates async response
    }
    switch (message.action) {
        case "initStorage":
            chrome.storage.local.get(['inputFieldConfigs'], result => {
                if (!result.inputFieldConfigs) {
                    // If not found, set the storage to default
                    chrome.storage.local.set({ 'inputFieldConfigs': inputFieldConfigs }, () => {
                        currentInputFieldConfigs = inputFieldConfigs;
                    });
                } else {
                    currentInputFieldConfigs = result.inputFieldConfigs;
                }
            });
            break;

        case "updateInputFieldValue":
            const { placeholder, value } = message.data;
            updateOrAddInputFieldValue(placeholder, value);
            break;

        case "updateInputFieldConfigsInStorage":
            console.log('inputFieldConfig', message.data);
            updateInputFieldConfigsInStorage(message.data);
            break;

        case "deleteInputFieldConfig":
            deleteInputFieldConfig(message.data);
            break;

        case "getInputFieldConfig":
            getInputFieldConfig(sendResponse);
            return true; // Indicates async response

        case "updateRadioButtonValueByPlaceholder":
            updateRadioButtonValue(message.placeholderIncludes, message.newValue);
            break;

        case "deleteRadioButtonConfig":
            deleteRadioButtonConfig(message.data);
            break;

        case "updateDropdownConfig":
            const { placeholderIncludes, value: dropdownValue } = message.data;
            updateDropdownConfig(placeholderIncludes, dropdownValue);
            break;

        case "deleteDropdownConfig":
            deleteDropdownValueConfig(message.data);
            break;

        case "openDefaultInputPage":
            // chrome.tabs.create({ url: 'defaultInput.html' });
            window.open('http://localhost:5173', '_blank');
            break;

        default:
            console.error("Unknown action:", message.action);
            break;
    }
});

// Helper functions
function updateOrAddInputFieldValue(placeholder, value) {
    chrome.storage.local.get(['inputFieldConfigs'], result => {
        const inputFieldConfigs = result.inputFieldConfigs || [];
        const foundConfig = inputFieldConfigs.find(config => config.placeholderIncludes === placeholder);

        if (foundConfig) {
            foundConfig.defaultValue = value;
        } else {
            const newConfig = { placeholderIncludes: placeholder, defaultValue: value, count: 1 };
            inputFieldConfigs.push(newConfig);
        }

        chrome.storage.local.set({ 'inputFieldConfigs': inputFieldConfigs }, () => {
            currentInputFieldConfigs = inputFieldConfigs;
        });
    });
}

function updateInputFieldConfigsInStorage(placeholder) {
    chrome.storage.local.get(['inputFieldConfigs'], result => {
        const inputFieldConfigs = result.inputFieldConfigs || [];
        const foundConfig = inputFieldConfigs.find(config => config.placeholderIncludes === placeholder);

        if (foundConfig) {
            foundConfig.count++;
        } else {
            chrome.storage.local.get('defaultFields', result => {
                const defaultFields = result.defaultFields || {};
                console.log('result-defaultFields', result);
                const newConfig = { placeholderIncludes: placeholder, defaultValue: defaultFields.YearsOfExperience, count: 1 };
                inputFieldConfigs.push(newConfig);
            });
        }

        chrome.storage.local.set({ 'inputFieldConfigs': inputFieldConfigs }, () => {
            currentInputFieldConfigs = inputFieldConfigs;
        });
    });
}

function deleteInputFieldConfig(placeholder) {
    chrome.storage.local.get(['inputFieldConfigs'], result => {
        const inputFieldConfigs = result.inputFieldConfigs || [];
        const updatedConfigs = inputFieldConfigs.filter(config => config.placeholderIncludes !== placeholder);

        chrome.storage.local.set({ 'inputFieldConfigs': updatedConfigs }, () => {
            currentInputFieldConfigs = updatedConfigs;
        });
    });
}

function getInputFieldConfig(callback) {
    chrome.storage.local.get(['inputFieldConfigs'], result => {
        callback(result.inputFieldConfigs || []);
    });
}

function updateRadioButtonValue(placeholderIncludes, newValue) {
    chrome.storage.local.get('radioButtons', result => {
        const radioButtons = result.radioButtons || [];
        const storedRadioButtonInfo = radioButtons.find(info => info.placeholderIncludes === placeholderIncludes);

        if (storedRadioButtonInfo) {
            storedRadioButtonInfo.defaultValue = newValue;
            storedRadioButtonInfo.options.forEach(option => {
                option.selected = option.value === newValue;
            });
        } else {
            console.error(`Item with placeholderIncludes ${placeholderIncludes} not found`);
        }

        chrome.storage.local.set({ 'radioButtons': radioButtons });
    });
}

function deleteRadioButtonConfig(placeholder) {
    chrome.storage.local.get('radioButtons', result => {
        const radioButtons = result.radioButtons || [];
        const updatedRadioButtons = radioButtons.filter(config => config.placeholderIncludes !== placeholder);

        chrome.storage.local.set({ 'radioButtons': updatedRadioButtons });
    });
}

function updateDropdownConfig(placeholderIncludes, newValue) {
    chrome.storage.local.get('dropdowns', result => {
        const dropdowns = result.dropdowns || [];
        const storedDropdownInfo = dropdowns.find(info => info.placeholderIncludes === placeholderIncludes);

        if (storedDropdownInfo) {
            storedDropdownInfo.options.forEach(option => {
                option.selected = option.value === newValue;
            });

            chrome.storage.local.set({ 'dropdowns': dropdowns });
        }
    });
}

function deleteDropdownValueConfig(placeholder) {
    chrome.storage.local.get('dropdowns', result => {
        const dropdowns = result.dropdowns || [];
        const updatedDropdowns = dropdowns.filter(config => config.placeholderIncludes !== placeholder);

        chrome.storage.local.set({ 'dropdowns': updatedDropdowns });
    });
}
