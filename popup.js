document.getElementById('getToken').addEventListener('click', function() {
    chrome.runtime.sendMessage({ action: "getToken" }, function(response) {
        document.getElementById('tokenDisplay').textContent = response.token;
    });
});

document.getElementById('copyToken').addEventListener('click', function() {
    const token = document.getElementById('tokenDisplay').textContent;
    if (token !== "No Okta Access Token Found") {
        navigator.clipboard.writeText(token).then(() => {
            console.log('Token copied to clipboard');
            // Update the UI to show that the token has been copied
            document.getElementById('copyStatus').textContent = 'Token copied to clipboard!';
        }).catch(err => {
            console.error('Error in copying text: ', err);
            document.getElementById('copyStatus').textContent = 'Failed to copy token.';
        });
    } else {
        document.getElementById('copyStatus').textContent = '';
    }
});

