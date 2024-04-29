
const copyButton = document.querySelector('#copy-button');
const swear = document.querySelector('#swear');
let timeout;
function copy() {
    clearTimeout(timeout);
    navigator.clipboard.writeText(swear.textContent);
   copyButton.classList.add('copied');
   timeout = setTimeout(() => {
       copyButton.classList.remove('copied');
   }, 1000);
}