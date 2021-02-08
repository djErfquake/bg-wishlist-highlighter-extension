import browser from "webextension-polyfill";

browser.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === "install") {
        alert("Thanks for installing! Don't forget to set your BoardGameGeek username!");
    }
});