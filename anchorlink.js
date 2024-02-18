const getAnchorableElements = () => {
  return document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id], h1[name], h2[name], h3[name], h4[name], h5[name], h6[name], a[id], a[name], span[id], span[name]');
}

const findClosestElement = (elements, targetX, targetY) => {
    let closestElement = null;
    let minDistance = Number.MAX_VALUE;

    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const elementX = (rect.left + rect.width) / 2;
        const elementY = (rect.top + rect.height) / 2;

        const distance = Math.sqrt(Math.pow(targetX - elementX, 2) + Math.pow(targetY - elementY, 2));

        if (distance < minDistance) {
            minDistance = distance;
            closestElement = element;
        }
    });

    return closestElement;
}

const removeAnchorFromURL = url => {
    const anchorIndex = url.indexOf('#');
    if (anchorIndex !== -1) {
        // Anchor exists, remove it
        return url.slice(0, anchorIndex);
    } else {
        // No anchor, return the original URL
        return url;
    }
}

let contextX, contextY

window.addEventListener("contextmenu", e => {
  contextX = e.clientX
  contextY = e.clientY
})


chrome.runtime.onMessage.addListener((m,s,sr) => {
  if (m == "generate-link") {
    const anchorableElems = getAnchorableElements()
    const closestElement = findClosestElement(anchorableElems, contextX, contextY)
    const newURL = removeAnchorFromURL(window.location.href) + "#" + closestElement.id
    navigator.clipboard.writeText(newURL)
  }
})
