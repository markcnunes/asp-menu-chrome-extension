function genericOnClick(info, tab) {
    chrome.tabs.executeScript(null,
                              {"file": "jquery.min.js"},
                              function() {
                                  chrome.tabs.sendMessage(tab.id,{"message":"hide"});
                              });
}
function genericOnClick2(info, tab) {
    chrome.tabs.executeScript(null,
                              {"file": "jquery.min.js"},
                              function() {
                                  if (info.menuItemId === "contextId1"){
                                    chrome.tabs.sendMessage(tab.id,{"message":"hide"});
                                    // var sText = info.selectionText;
                                    // var url = "https://www.google.com/search?q=" + encodeURIComponent(sText); 
                                    // window.open(url, '_blank');
                                  }
                                  if (info.menuItemId === "contextId2"){
                                    chrome.tabs.sendMessage(tab.id,{"message":"pageId"});
                                     
                                  }
                              });
}


chrome.contextMenus.create({"title": "Hide body",
                            "contexts":["page"],
                            "id":"contextId1"});
chrome.contextMenus.create({"title": "Open this page in the backoffice",
                            "contexts":["page"],
                            "id":"contextId2"});

chrome.contextMenus.onClicked.addListener(genericOnClick);
