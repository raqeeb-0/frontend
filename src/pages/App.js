import { RequireAuth } from '../components/auth';


export const App = () => {
  return (
    <RequireAuth>
      <h1> Hello, From inside the app </h1>
    </RequireAuth>
  );
}
