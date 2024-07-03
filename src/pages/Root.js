import { Link } from 'react-router-dom';


export const Root = () => {
  return (
    <div>
      <h1> Hello, From Root! </h1>
      <br />
      <h3>
        Go to ==> &nbsp;
        <Link to='signup'>
          Sign up
        </Link>
      </h3>
    </div>
  );
}
