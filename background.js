console.log('backend loaded')
chrome.webRequest.onCompleted.addListener(
    (details) => {
        console.log('request end')
        console.log(details)
        let name = 'https://chatgpt.com/*'
        if (details.url.includes('https://claude.ai'))
        {
            name = 'https://claude.ai/*'
        }

        chrome.tabs.query({
            url: name
          }, (result) => {
            result.forEach(currentTab => {
                console.log(currentTab.url)
                chrome.tabs.sendMessage(currentTab.id, {
                    name: 'chat_gpt',
                    status: 'done',
                }, () => {}); 
            });
          });
          console.log('request end')
    },
    {urls: ['https://chatgpt.com/backend-api/lat/r', 'https://claude.ai/api/organizations*chat_conversations*?tree=True']},
    []
  );

  chrome.runtime.onMessage.addListener((request, options) => {
    console.log(request)
    if (request.name === 'all_page') {
        if (request.status === 'done') {
            chrome.tabs.query({
                url: ["*://progress-sound.an.r.appspot.com/*"]
              }, (result) => {
                result.forEach(currentTab => {
                    console.log(currentTab.url)
                    chrome.tabs.sendMessage(currentTab.id, {
                        name: 'all_page',
                        status: 'done',
                    }, () => {}); 
                });
              });
              console.log('send back message to player')
        }
    }
})

console.log('backend loaded')