import '~/scss/style.scss';
import Header from './components/Header';
import List from './components/List';
import Detail from './components/Detail';
import { request } from './utils/api';

export default function App({ $target }) {
  this.state = {
    reservations: [],
    clickedReservation: {},
  };

  const header = new Header({ $target });

  const list = new List({
    $target,
    initialState: this.state.reservations,
    onClick: targetList => {
      console.log(targetList);
      this.setState({
        ...this.state,
        clickedReservation: targetList,
      });
    },
  });

  const detail = new Detail({
    $target,
    initialState: this.state.clickedReservation,
  });

  this.setState = nextState => {
    this.state = nextState;

    list.setState({
      reservations: this.state.reservations,
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
    });
  };

  getReservations();
}
