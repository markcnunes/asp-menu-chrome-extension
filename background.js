/*=============================================================================
 |      Project:  ASP EXTENSION
 | 
 |  Description:  Extension to interact with the ASP backoffice.
 |
 |       Author:  MARK CLAUS NUNES
 |    
 |     Created - Date:  01/01/2022
 *===========================================================================*/

 
function genericOnClick(info, tab) {
    chrome.tabs.executeScript(
        null,
        {
            file: "jquery.min.js"
        },
        function() {
            if (info.menuItemId === "contextId1") {
                chrome.tabs.sendMessage(tab.id, {
                    message: "backoffice"
                });
            } else if (info.menuItemId === "contextId2") {
                chrome.tabs.sendMessage(tab.id, {
                    message: "page"
                });
                // console.log("Info", info);
                // console.log("Tab", tab);
            } else if (info.menuItemId === "contextId3") {
                chrome.tabs.sendMessage(tab.id, {
                    message: "panels"
                });
                // console.log("Info", info);
                // console.log("Tab", tab);
            } else if (info.menuItemId === "contextId4") {
                chrome.tabs.sendMessage(tab.id, {
                    message: "menus"
                });
            } else if (info.menuItemId === "contextId5") {
                chrome.tabs.sendMessage(tab.id, {
                    message: "dev"
                });
            }
        }
    );
}

chrome.contextMenus.create({
    title: "Open backoffice",
    contexts: ["page"],
    id: "contextId1"
});
chrome.contextMenus.create({
    title: "Open this page in the backoffice",
    contexts: ["page"],
    id: "contextId2"
});
chrome.contextMenus.create({
    title: "Show panels",
    contexts: ["page"],
    id: "contextId3"
});
chrome.contextMenus.create({
    title: "Show menus",
    contexts: ["page"],
    id: "contextId4"
});
chrome.contextMenus.create({
    title: "Show dev info",
    contexts: ["page"],
    id: "contextId5"
});

chrome.contextMenus.onClicked.addListener(genericOnClick);
