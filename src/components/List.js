export default function List({ $target, initialState = {} }) {
  const $section = document.createElement('section');

  $section.className = 'list-wrapper';
  $target.appendChild($section);

  this.state = initialState;

  this.setState = nextState => {
    if (this.state.reservations !== nextState.reservations) {
      this.state = nextState;
      this.render();
    }
  };

  this.render = () => {
    const { reservations } = this.state; // status가 done 경우 제외

    $section.innerHTML = `
      <ul>
        ${reservations
          ?.map(
            list => `
          <li class="list">
            <div class="list-state">
              <div>${list.timeReserved}</div>
              <div>${list.status}</div>
            </div>
            <div class="list-content">
              <div>${list.customer.name} - ${list.tables.map(
              table => `${table.name}`,
            )}</div>
              <div>성인 ${list.customer.adult} 아이 ${list.customer.child}</div>
              <div>${list.menus.map(
                menu => `
                ${menu.name}(${menu.qty})
              `,
              )}
              </div>
            </div>
            <button class="list-button">
              ${list.status === 'reserved' ? '착석' : '퇴석'}
            </button>
          </li>
        `,
          )
          .join('')}
      </ul>
    `;
  };

  this.render();
}
