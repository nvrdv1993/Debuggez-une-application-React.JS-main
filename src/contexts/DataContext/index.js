import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [last, setLast] = useState(null); //
  const getData = useCallback(async () => {
    try {
      const response = await api.loadData()
      setData(response);
      console.log(response) //
      const test = response.events.sort((evtA, evtB) => // du slider, byDateDesc 
        new Date(evtA.date) > new Date(evtB.date) ? -1 : 1 // on amis > au lieu de <
      );
      console.log(test)
      console.log(test[0]) // tableau index
      setLast(test[0])
    } catch (err) {
      setError(err);
    }
  }, []);
  useEffect(() => {
    if (data) return;
    getData();
  });

  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last // et le mettre dans le provider
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
