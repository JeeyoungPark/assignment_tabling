import '~/scss/style.scss';
import Header from './components/Header';
import { request } from './utils/api';

export default function App({ $target }) {
  this.state = {
    reservations: [],
  };

  const header = new Header({ $target });

  this.setState = nextState => {
    this.state = nextState;
  };

  const init = async () => {
    try {
      const { reservations } = await request('/v1/store/9533/reservations');

      this.setState({ ...this.state, reservations });
    } catch (e) {
      alert(e);
    }
  };

  init();
}
