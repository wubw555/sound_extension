
const loadedOnAllPages = (e) => {
    chrome.runtime.sendMessage({
        name: 'all_page',
        status: 'done',
    });
    console.log('page load message sended')
}

window.addEventListener("load", loadedOnAllPages, false);

