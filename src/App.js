import '~/scss/style.scss';
import Header from './components/Header';
import List from './components/List';
import Detail from './components/Detail';
import { request } from './utils/api';

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
    onListClick: targetList => {
      /**
       * 1. clickedId 변경
       * 2. List컴포넌트와 Detail컴포넌트 다시 렌더링
       */
      console.log('리스트 클릭이벤트 동작!!');
      this.setState({
        ...this.state,
        // clickedReservation: targetList,
        clickedReservationId: targetList.id,
      });
    },
    onButtonClick: (id, status) => {
      console.log('버튼클릭이벤트 동작!!');
      let targetId = id;
      console.log('targetId', targetId);
      let reservations = [...this.state.reservations];

      // "착석" 버튼 클릭시 -> status 상태 변경
      if (status === 'reserved') {
        reservations = reservations.map(list => {
          if (list.id === targetId) list.status = 'seated';

          return list;
        });
      } else if (status === 'seated') {
        // "퇴석" 버튼 클릭시
        // -> 1)satus 상태 변경, 2)clicked 아이디와 리스트 임의 설정
        reservations = reservations.map(list => {
          if (list.id === targetId) list.status = 'done';

          return list;
        });

        const validReservations = reservations.filter(
          list => list.status !== 'done',
        );
        console.log('valid', validReservations);

        if (validReservations.length) {
          targetId = validReservations[0].id;
        } else {
          targetId = -1;
        }
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
    console.log('App setState한다');
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
    console.log('서버에서 데이터 가져옴!!!');
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
