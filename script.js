const terminal = document.querySelector('#terminal');

if (terminal) {
  console.log(terminal);
  terminal.addEventListener('click', function focus() {
    document.querySelector('#cursor-blink').focus();
  });
}
