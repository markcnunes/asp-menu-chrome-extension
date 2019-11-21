function genericOnClick(info, tab) {
    chrome.tabs.executeScript(
        null,
        {
            file: "jquery.min.js"
        },
        function() {
            if (info.menuItemId === "contextId1") {
                chrome.tabs.sendMessage(tab.id, {
                    message: "pageId"
                });
            }
            if (info.menuItemId === "contextId2") {
                chrome.tabs.sendMessage(tab.id, {
                    message: info
                });
                console.log("Info", info);
                console.log("Tab", tab);
            }
        }
    );
}

chrome.contextMenus.create({
    title: "Open this page in the backoffice",
    contexts: ["page"],
    id: "contextId1"
});
chrome.contextMenus.create({
    title: "Open panel",
    contexts: ["page"],
    id: "contextId2"
});

chrome.contextMenus.onClicked.addListener(genericOnClick);
