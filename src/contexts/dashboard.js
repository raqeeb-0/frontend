import { createContext, useState } from 'react';


export const OrgsContext = createContext({
  orgs: [],
  setOrgs: () => [],
});

export const OrgsProvider = ({ children }) => {
  const [orgs, setOrgs] = useState([]);

  return (
    <OrgsContext.Provider value={{ orgs, setOrgs }}>
      { children }
    </OrgsContext.Provider>
  );
}
