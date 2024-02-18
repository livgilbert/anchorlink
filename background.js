chrome.contextMenus.create({
  "id": "anchorlink-get-link",
  "title": "Copy Link To Here",
  "contexts": ["all"]
})

chrome.contextMenus.onClicked.addListener((info,tab) => {
  chrome.tabs.sendMessage(tab.id, "generate-link")
})
