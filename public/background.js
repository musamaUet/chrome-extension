/* eslint-disable no-undef */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "SAVE_DETAILS") {
      // Save the complete object
      chrome.storage.sync.set({ userDetails: message.details }, () => {
        if (chrome.runtime.lastError) {
          sendResponse({ success: false, error: chrome.runtime.lastError.message });
        } else {
          sendResponse({ success: true, message: "Details saved successfully!" });
        }
      });
      return true; // Keep the message channel open for async sendResponse
    }
  
    if (message.type === "GET_DETAILS") {
      // Retrieve the complete object
      chrome.storage.sync.get("userDetails", (result) => {
        if (chrome.runtime.lastError) {
          sendResponse({ success: false, error: chrome.runtime.lastError.message });
        } else {
          sendResponse({ success: true, details: result.userDetails });
        }
      });
      return true; // Keep the message channel open for async sendResponse
    }
  });  