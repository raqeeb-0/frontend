import { useRouteError } from 'react-router-dom';


export const ErrorPage = () => {
  const error = useRouteError();
  const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  }
  const headerStyle = {
    padding: '5px'
  }

  if (error.status === 503) {
    error.statusText = 'Service Unavailable';
  }

  return (
    <div style={style}>
      <h1 style={headerStyle}>{ error.status }</h1>
      <h2 style={headerStyle}>
        <i>{error.statusText || error.message}</i>
      </h2>
      <h3 style={headerStyle}>{ error.data }</h3>
    </div>
  );
}
