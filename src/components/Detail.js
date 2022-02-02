export default function Detail({ $target, initialState = {} }) {
  const $aside = document.createElement('aside');

  $aside.className = 'detail-wrapper';
  $target.appendChild($aside);

  this.state = initialState; // {clickedres: {}}

  this.setState = nextState => {
    this.state = nextState;
    console.log('Detail 렌더한다');
    this.render();
  };

  this.render = () => {
    const reservationTemplate = data => {
      return `
        <div>예약 상태</div>
        <div>${
          !data?.status ? '' : data.status === 'seated' ? '착석' : '예약 중'
        }</div>
        <div>예약 시간</div>
        <div>${!data?.timeReserved ? '' : data.timeReserved}</div>
        <div>접수 시간</div>
        <div>${!data?.timeRegistered ? '' : data.timeRegistered}</div>
      `;
    };

    const customerTemplate = data => {
      return `
        <div>고객 성명</div>
        <div>${!data ? '' : data.name}</div>
        <div>고객 등급</div>
        <div>${!data ? '' : data.level}</div>
        <div>고객 메모</div>
        <div>${!data ? '' : data.memo}</div>
        <div>요청 사항</div>
        <div>${!data ? '' : data.request}</div>
      `;
    };

    $aside.innerHTML = `
      <div class="detail">
        <div class="detail-reservation">
          <h3>예약 정보</h3>
          ${reservationTemplate(this.state.clickedReservation)}
        </div>
        <div class="detail-customer">
          <h3>고객 정보</h3>
          ${customerTemplate(this.state.clickedReservation?.customer)}
        </div>
      </div>
    `;
  };

  this.render();
}
