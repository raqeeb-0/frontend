import {
  Link,
  useLoaderData
} from 'react-router-dom';
import {
  TopNav
} from '../components';


export const Root = () => {
  const { isAuthenticated, username } = useLoaderData();

  return (
    <div>
      <TopNav
        isAuthenticated={isAuthenticated}
        username={username}
      />
      <section>
      </section>
      <footer>
      </footer>
    </div>
  );
}
