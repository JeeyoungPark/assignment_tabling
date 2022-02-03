import { formatTime } from '../utils/formatTime';

export default function List({
  $target,
  initialState = {}, // {reser: [], clickedResID: ''}
  onListClick,
  onButtonClick,
}) {
  const $section = document.createElement('section');

  $section.className = 'list-wrapper';
  $target.appendChild($section);

  this.state = initialState;

  this.setState = nextState => {
    // next: {reser: [], clickedResID: ''}
    if (
      this.state.reservations !== nextState.reservations ||
      this.state.clickedReservationId !== nextState.clickedReservationId
    ) {
      this.state = nextState;

      console.log('리스트 렌더한다');
      this.render();
    }
  };

  this.render = () => {
    /**
     * 렌더하기 전
     * 1. status === done인 list 제외
     * 2. clickedId === id인 list의 클래스네임 변경 -> css 효과 적용
     */
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
            clickedReservationId === list.id ? 'clicked' : ''
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
              <div class="ellipsis-1">성인 ${list.customer.adult} 아이 ${
              list.customer.child
            }</div>
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

        onButtonClick(id, status);
        return; // 버튼 클릭시 onListClidk 이벤트가 같이 동작하는 걸 방지;
      }

      if (targetList) {
        onListClick(targetList);
      }
    }
  });
}
