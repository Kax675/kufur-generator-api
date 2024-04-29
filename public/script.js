
const copyButton = document.querySelector('#copy-button');
const swear = document.querySelector('#swear');
const code = document.querySelector('code');
let timeout;
function copy() {
    clearTimeout(timeout);
    navigator.clipboard.writeText(swear.textContent);
    code.classList.add('copied');
   timeout = setTimeout(() => {
       code.classList.remove('copied');
   }, 1000);
}