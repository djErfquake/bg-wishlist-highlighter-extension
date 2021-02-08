import browser from "webextension-polyfill";

const key = "bggWishlistHighlightSettings";
let color = {
    bg: "#FAB81B",
    fg: "#000000"
};

browser.storage.local.get(key).then((settingsData) => {
    const highlightSettings = settingsData[key];
    const username = highlightSettings.username;
    if (username && username != "") {
        color.bg = highlightSettings.bgColor;
        color.fg = highlightSettings.fgColor;
        if (highlightSettings.update) {
            $.getJSON(`https://bgg-json.azurewebsites.net/collection/${username}`, function(bggData) { 
                const wishlistItems = bggData.filter(g => g.wishList).map(g => g.name);
                highlightSettings.wishList = wishlistItems;
                highlightSettings.update = false;
                browser.storage.local.set({ bggWishlistHighlightSettings: highlightSettings});

                replaceText(wishlistItems);
            });
        }
        else {
            replaceText(highlightSettings.wishList);
        }
    }
});



function replaceText(wishlistItems) {
    let textElements = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, span, a');
    let gamesString = "";
    for (let i = 0; i < textElements.length; i++) {
        let element = textElements[i];
        if (element.innerText.includes('=')) continue;
        for (let j = 0; j < wishlistItems.length; j++) {
            const gameName = wishlistItems[j];
            if (element.innerText.includes(gameName)) {
                gamesString += `${element.tagName}: ${element.innerText}MMMMM`;
                element.innerHTML = element.innerHTML.replace(new RegExp(gameName, 'g'), `<span style="background-color: ${color.bg}; color: ${color.fg};">${gameName}</span>`);
            }
        }
    }
}

