const script = document.createElement('script')
// eslint-disable-next-line no-undef
script.src = chrome.runtime.getURL('./inject.js')
script.type = 'module'
document.documentElement.appendChild(script)
