function getTokenFromStorage(sendResponse) {
    chrome.tabs.executeScript({
        code: 'localStorage.getItem("okta-token-storage");'
    }, function (results) {
        if (chrome.runtime.lastError || !results || !results.length || !results[0]) {
            console.error('No Okta Access Token Found:', chrome.runtime.lastError);
            sendResponse({ token: "No Okta Access Token Found" });
            return;
        }
        let tokenData = JSON.parse(results[0]);
        let accessToken = tokenData.accessToken ? tokenData.accessToken.accessToken : "No Okta Access Token Found";
        sendResponse({ token: accessToken });
    });
    return true; // Indicates that the response is sent asynchronously
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getToken") {
        getTokenFromStorage(sendResponse);
    }
    return true; // Keep the message channel open for the asynchronous response
});

