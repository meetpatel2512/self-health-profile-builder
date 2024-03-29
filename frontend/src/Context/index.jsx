import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Context = createContext();

export function ContextProvider({ children }) {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  const [AllReports, setAllReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const LocalStoragetoken = localStorage.getItem('session_Id');
    if (LocalStoragetoken) {
      setToken(LocalStoragetoken);
      getAllReports();
      setUsername();
    }
  }, []);

  // get all notes
  const getAllReports = useCallback(async () => {
    try {
      const localtoken = localStorage.getItem('session_Id');
      const res = await fetch('http://localhost:3500/report', {
        method: 'GET',
        headers: {
          Authorization: localtoken,
          'Content-Type': 'application/json',
        },
      });
      const reportdata = await res.json();
      if (!reportdata.Authentication) {
        Logout();
        throw reportdata.error;
      }
      setAllReports(reportdata.allreport);
      setUsername(reportdata.username);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // add note here
  const addReports = useCallback(async data => {
    try {
      const localtoken = localStorage.getItem('session_Id');

      const res = await fetch('http://localhost:3500/report', {
        method: 'POST',
        headers: {
          Authorization: localtoken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data }),
      });
      const addreport = await res.json();
      if (!addreport.Authentication) {
        Logout();
        throw reportdata.error;
      }
      getAllReports();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // delete reports
  const deleteReport = useCallback(async id => {
    try {
      const localtoken = localStorage.getItem('session_Id');
      const report = await fetch(`http://localhost:3500/report/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: localtoken,
        },
      });
      const deletereport = await report.json();
      if (!deletereport.Authentication) {
        Logout();
        throw deletereport.error;
      }
      getAllReports();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Authenticate User
  const Authenticate = useCallback(async (url, data) => {
    const formdata = await fetch(`http://localhost:3500/user/${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data }),
    });
    const resData = await formdata.json();
    if (!resData.success) {
      setError(resData.message);
    } else {
      localStorage.setItem('session_Id', resData.data.token);
      setError(null);
      setToken(resData.data.token);
      setUsername(resData.username);
      getAllReports();
      navigate('/');
    }
  }, []);

  // Logout User
  const Logout = useCallback(() => {
    localStorage.removeItem('session_Id');
    navigate('/login');
  }, []);

  const values = useMemo(
    () => ({
      error,
      Authenticate,
      getAllReports,
      username,
      AllReports,
      token,
      addReports,
      deleteReport,
      Logout,
    }),
    [
      token,
      error,
      Authenticate,
      getAllReports,
      username,
      AllReports,
      addReports,
      deleteReport,
      Logout,
    ],
  );
  return (
    <Context.Provider
      value={{
        ...values,
      }}
    >
      {children}
    </Context.Provider>
  );
}

const UseContext = () => useContext(Context);

ContextProvider.protoType = {
  children: PropTypes.node.isRequired,
};
export default Context;
export { UseContext };
