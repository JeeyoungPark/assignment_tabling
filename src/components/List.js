import { formatTime, formatNumber } from '~/utils/format';
import { checkStateType } from '~/utils/validate';

export default function List({
  $target,
  initialState = {},
  onClickList,
  onClickButton,
}) {
  const $section = document.createElement('section');

  $section.className = 'list-wrapper';
  $target.appendChild($section);

  this.state = initialState;

  this.setState = nextState => {
    if (
      checkStateType(nextState, 'Object') &&
      checkStateType(nextState.reservations, 'Array') &&
      checkStateType(nextState.clickedReservationId, 'String')
    ) {
      if (
        this.state.reservations !== nextState.reservations ||
        this.state.clickedReservationId !== nextState.clickedReservationId
      ) {
        this.state = nextState;
        this.render();
      }
    }
  };

  this.render = () => {
    // status가 done인 list 제외
    const validReservations = this.state.reservations?.filter(
      list => list.status !== 'done',
    );

    const { clickedReservationId } = this.state;

    $section.innerHTML = `
      <ul>
        ${validReservations
          ?.map(
            list => `
          <li class="list ${
            list.id === clickedReservationId ? 'clicked' : ''
          }" data-id="${list.id}">
            <div class="list-state">
              <div>${formatTime(list.timeReserved)}</div>
              <div data-status=${list.status}>${
              list.status === 'reserved' ? '예약' : '착석 중'
            }</div>
            </div>
            <div class="list-content">
              <div class="ellipsis-1">${list.customer.name} - ${list.tables.map(
              table => `${table.name}`,
            )}</div>
              <div class="ellipsis-1">성인 ${formatNumber(
                list.customer.adult,
              )} 아이 ${formatNumber(list.customer.child)}</div>
              <div class="ellipsis-1">${list.menus.map(
                menu => `
                ${menu.name}(${menu.qty})
              `,
              )}
              </div>
            </div>
            <button class="list-button" data-status=${list.status}>
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

  // 렌더링 이후 클릭 가능한 모든 요소에 click 이벤트 걸기
  $section.addEventListener('click', event => {
    const $list = event.target.closest('.list');
    const $button = event.target.closest('.list-button');

    if ($list) {
      const { id } = $list.dataset;
      const targetList = this.state.reservations.find(list => list.id === id);

      if ($button) {
        const { status } = $button.dataset;

        onClickButton(id, status);
        return; // 버튼 클릭시 onListClick 이벤트가 같이 동작하는 걸 방지
      }

      if (targetList) {
        onClickList(targetList);
      }
    }
  });
}
