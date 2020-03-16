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
            } else if (info.menuItemId === "contextId6") {
                chrome.tabs.sendMessage(tab.id, {
                    message: "open-preview"
                });
            } else if (info.menuItemId === "contextId7") {
                chrome.tabs.sendMessage(tab.id, {
                    message: "open-local"
                });
            }
        }
    );
}

// Load jQuery
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.tabs.executeScript(tabId, {
        file: 'jquery.min.js'
    }, () => chrome.runtime.lastError);
}); 

// Check if it is ASP
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.options.asp === "is-asp") {
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
        if (request.options.message === "is-local") {
            console.log('is-local');
            chrome.contextMenus.create({
                title: "Open page in preview",
                contexts: ["page"],
                id: "contextId6"
            });
        } else if (request.options.message === "not-local") {
            console.log('not-local');
            chrome.contextMenus.create({
                title: "Open page in local",
                contexts: ["page"],
                id: "contextId7"
            });
            
        }
    }
    sendResponse();
});

chrome.contextMenus.onClicked.addListener(genericOnClick);
