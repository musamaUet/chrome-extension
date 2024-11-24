/* eslint-disable no-undef */
// Listen for messages from the web app
window.addEventListener("message", (event) => {
    if (event.source !== window || !event.data || event.data.type !== "SAVE_DETAILS") {
      return; // Ignore irrelevant messages
    }
  
    const userDetails = event.data.details; // The complete object to save
  
    // Send a message to the background script to save the details
    chrome.runtime.sendMessage(
      { type: "SAVE_DETAILS", details: userDetails },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error("Error communicating with the extension:", chrome.runtime.lastError);
        } else {
          console.log("Response from extension:", response);
  
          // Ask the background script to retrieve the saved details
          chrome.runtime.sendMessage(
            { type: "GET_DETAILS" },
            (result) => {
              if (chrome.runtime.lastError) {
                console.error("Error retrieving details:", chrome.runtime.lastError);
              } else {
                console.log("Retrieved details from storage:", result.details);
              }
            }
          );
        }
      }
    );
  });
  