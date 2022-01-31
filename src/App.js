import '~/scss/style.scss';

export default function App({ $target }) {
  const $header = document.createElement('header');
  const $h1 = document.createElement('h1');

  $header.appendChild($h1);
  $h1.innerHTML = 'hello world';

  $target.appendChild($header);
}
