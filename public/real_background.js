/* eslint-disable no-undef */

const inputFieldConfigs = [
];

let currentInputFieldConfigs = [];

chrome.runtime.onConnect.addListener(port => {});

//INITIAL LOAD
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'initStorage') {
        chrome.storage.local.get(['inputFieldConfigs'], result => {

            // if not found then set the storage to default
            if (!result.inputFieldConfigs) {
                chrome.storage.local.set({ 'inputFieldConfigs': inputFieldConfigs }, () => {
                    currentInputFieldConfigs = inputFieldConfigs;
                });
            }

            else {
                // found storage
                currentInputFieldConfigs = result.inputFieldConfigs;
            }

        });
    }

});

//update value for placeholder
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateInputFieldValue') {
        const placeholder = request.data.placeholder;
        const value = request.data.value;
        updateOrAddInputFieldValue(placeholder, value);
    }

});
// logic to update count or add new placeholder
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateInputFieldConfigsInStorage') {
        const placeholder = request.data;

        updateInputFieldConfigsInStorage(placeholder);
    }
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'deleteInputFieldConfig') {
        const placeholder = request.data;

        deleteInputFieldConfig(placeholder);
    }
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getInputFieldConfig') {
        getInputFieldConfig(sendResponse);
        // Returning true indicates that the response will be sent asynchronously
        return true;
    }
});

function updateOrAddInputFieldValue(placeholder, value) {

    chrome.storage.local.get(['inputFieldConfigs'], result => {
        const inputFieldConfigs = result.inputFieldConfigs || [];
        const foundConfig = inputFieldConfigs.find(config => config.placeholderIncludes === placeholder);

        if (foundConfig) {
            foundConfig.defaultValue = value;

            chrome.storage.local.set({ 'inputFieldConfigs': inputFieldConfigs }, () => {
                currentInputFieldConfigs = inputFieldConfigs;
            });

        } else {
            const newConfig = { placeholderIncludes: placeholder, defaultValue: value, count: 1 };
            inputFieldConfigs.push(newConfig);

            chrome.storage.local.set({ 'inputFieldConfigs': inputFieldConfigs }, () => {
                currentInputFieldConfigs = inputFieldConfigs;
            });
        }


    });
}

function findConfigByPlaceholder(placeholder) {
    return currentInputFieldConfigs.find(config => config.placeholderIncludes === placeholder);
}

function updateInputFieldConfigsInStorage(placeholder) {
    chrome.storage.local.get(['inputFieldConfigs'], result => {
        const inputFieldConfigs = result.inputFieldConfigs || [];

        // Find the config by placeholder
        const foundConfig = inputFieldConfigs.find(config => config.placeholderIncludes === placeholder);

        if (foundConfig) {
            // If found, update the count
            foundConfig.count++;

                    // Update the inputFieldConfigs in storage
        chrome.storage.local.set({ 'inputFieldConfigs': inputFieldConfigs }, () => {
            currentInputFieldConfigs = inputFieldConfigs;
        });


        } else {

            chrome.storage.local.get('defaultFields', function(result) {
                const defaultFields = result.defaultFields || {};

                const newConfig = { placeholderIncludes: placeholder, defaultValue: defaultFields.YearsOfExperience, count: 1 };
                inputFieldConfigs.push(newConfig);

                        // Update the inputFieldConfigs in storage
        chrome.storage.local.set({ 'inputFieldConfigs': inputFieldConfigs }, () => {
            currentInputFieldConfigs = inputFieldConfigs;
        });
              });


        }


    });
}


function deleteInputFieldConfig(placeholder) {
    chrome.storage.local.get(['inputFieldConfigs'], result => {
        const inputFieldConfigs = result.inputFieldConfigs || [];

        // Find the index of the config by placeholder
        const configIndex = inputFieldConfigs.findIndex(config => config.placeholderIncludes === placeholder);

        if (configIndex !== -1) {
            // If found, remove the config from the array
            const deletedConfig = inputFieldConfigs.splice(configIndex, 1)[0];
        } else {
            // If not found, handle accordingly
            console.error(`Configuration for ${placeholder} not found. Unable to delete.`);
            return;
        }

        // Update the inputFieldConfigs in storage after deletion
        chrome.storage.local.set({ 'inputFieldConfigs': inputFieldConfigs }, () => {
            currentInputFieldConfigs = inputFieldConfigs;
        });
    });
}

function getInputFieldConfig(callback) {
    try {
        chrome.storage.local.get(['inputFieldConfigs'], result => {
            const fieldConfig = result && result.inputFieldConfigs ? result.inputFieldConfigs : null;
            callback(fieldConfig);
        });
    } catch (error) {
        console.error("Error fetching inputFieldConfigs:", error);
        // Handle the error as needed
        callback(null);
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'updateRadioButtonValueByPlaceholder') {
        updateRadioButtonValue(message.placeholderIncludes, message.newValue)
    }
});

function updateRadioButtonValue(placeholderIncludes, newValue) {
    chrome.storage.local.get('radioButtons', (result) => {
        const storedRadioButtons = result.radioButtons || [];
        const storedRadioButtonInfo = storedRadioButtons.find(info => info.placeholderIncludes === placeholderIncludes);
        if (storedRadioButtonInfo) {
            storedRadioButtonInfo.defaultValue = newValue;
            // Update selected property of options
            storedRadioButtonInfo.options.forEach(option => {
                option.selected = option.value === newValue;
            });
            chrome.storage.local.set({ 'radioButtons': storedRadioButtons }, () => {
            });
        } else {
            console.error(`Item with placeholderIncludes ${placeholderIncludes} not found`);
        }
    });
}


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'deleteRadioButtonConfig') {
        const placeholder = message.data;
        deleteRadioButtonConfig(placeholder);
    }
});

function deleteRadioButtonConfig(placeholder) {
    chrome.storage.local.get('radioButtons', function(result) {
        const radioButtons = result.radioButtons || [];
        const updatedRadioButtons = radioButtons.filter(config => config.placeholderIncludes !== placeholder);
        
        chrome.storage.local.set({ 'radioButtons': updatedRadioButtons }, function() {

        });
    });
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'updateDropdownConfig') {
        const { placeholderIncludes, value } = message.data;
        updateDropdownConfig(placeholderIncludes, value);
    }
});

function updateDropdownConfig(placeholderIncludes, newValue) {
    chrome.storage.local.get('dropdowns', function(result) {
        let dropdowns = result.dropdowns || [];

        const storedDropdownInfo = dropdowns.find(info => info.placeholderIncludes === placeholderIncludes);
        storedDropdownInfo.options.forEach(option => {
            option.selected = option.value === newValue;
        });

            // Save the updated dropdowns to the storage
            chrome.storage.local.set({ 'dropdowns': dropdowns }, function() {

            });
        
    });
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'deleteDropdownConfig') {
        const placeholder = message.data;
        deleteDropdownValueConfig(placeholder);
    }
});

function deleteDropdownValueConfig(placeholder) {
    chrome.storage.local.get('dropdowns', function(result) {
        let dropdowns = result.dropdowns || [];

        const indexToDelete = dropdowns.findIndex(config => config.placeholderIncludes === placeholder);

        if (indexToDelete !== -1) {
            dropdowns.splice(indexToDelete, 1);

            chrome.storage.local.set({ 'dropdowns': dropdowns }, function() {

            });
        }
    });
}
//OPEN DEFAULT MESSAGE LISTNER
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'openDefaultInputPage') {
        chrome.tabs.create({ url: 'defaultInput.html' });
    }
});