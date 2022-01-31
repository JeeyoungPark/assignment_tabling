import '~/scss/style.scss';
import { request } from './utils/api';

export default function App({ $target }) {
  this.state = {
    reservations: [],
  };

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
