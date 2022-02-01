import '~/scss/style.scss';
import Header from './components/Header';
import List from './components/List';
import { request } from './utils/api';

export default function App({ $target }) {
  this.state = {
    reservations: [],
  };

  const header = new Header({ $target });

  const list = new List({
    $target,
    initialState: this.state.reservations,
  });

  this.setState = nextState => {
    this.state = nextState;

    list.setState({
      reservations: this.state.reservations,
    });
  };

  const getReservations = async () => {
    const { reservations } = await request('/v1/store/9533/reservations');

    this.setState({
      ...this.state,
      reservations,
    });
  };

  getReservations();
}
