export default function Header({ $target }) {
  const $header = document.createElement('header');
  const $h1 = document.createElement('h1');

  $h1.innerHTML = '예약 목록';

  $header.appendChild($h1);
  $target.appendChild($header);
}
