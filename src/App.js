import '~/scss/style.scss';
import Header from '~/components/Header';
import List from '~/components/List';
import Detail from '~/components/Detail';
import { request } from '~/utils/api';

export default function App({ $target }) {
  this.state = {
    reservations: [],
    clickedReservationId: '',
    clickedReservation: {},
  };

  new Header({ $target });

  const list = new List({
    $target,
    initialState: {
      reservations: this.state.reservations,
      clickedReservationId: this.state.clickedReservationId,
    },
    onClickList: targetList => {
      /**
       * 1. clickedId 변경
       * 2. List컴포넌트와 Detail컴포넌트 다시 렌더링
       */
      const $modal = document.querySelector('.detail-wrapper');
      $modal.classList.remove('close');

      this.setState({
        ...this.state,
        clickedReservationId: targetList.id,
      });
    },
    onClickButton: (id, status) => {
      let targetId = id;
      let reservations = [...this.state.reservations];

      // "착석" 버튼 클릭시 -> status 상태 변경
      if (status === 'reserved') {
        reservations = reservations.map(list => {
          if (list.id === targetId) list.status = 'seated';

          return list;
        });
      } else if (status === 'seated') {
        // "퇴석" 버튼 클릭시
        // 1) status 상태 변경, clicked 아이디를 첫번째 리스트로 설정
        reservations = reservations.map(list => {
          if (list.id === targetId) list.status = 'done';
          return list;
        });

        const validReservations = reservations.filter(
          list => list.status !== 'done',
        );

        // 리스트가 없을 경우 -1로 임의 설정
        targetId = validReservations.length ? validReservations[0].id : -1;
      }

      this.setState({
        ...this.state,
        reservations,
        clickedReservationId: targetId,
      });
    },
  });

  const detail = new Detail({
    $target,
    initialState: { clickedReservation: this.state.clickedReservation },
  });

  this.setState = nextState => {
    this.state = nextState;
    this.state.clickedReservation = this.state.reservations.find(
      list => list.id === this.state.clickedReservationId,
    );

    list.setState({
      reservations: this.state.reservations,
      clickedReservationId: this.state.clickedReservationId,
    });

    detail.setState({
      clickedReservation: this.state.clickedReservation,
    });
  };

  const getReservations = async () => {
    const { reservations } = await request('/v1/store/9533/reservations');
    const firstReservation = reservations[0];

    this.setState({
      ...this.state,
      reservations,
      clickedReservation: firstReservation,
      clickedReservationId: firstReservation.id,
    });
  };

  getReservations();
}
