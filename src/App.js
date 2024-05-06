import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const sharedClasses = {
    maxContainer: 'max-w-4xl mx-auto',
    flexCenter: 'flex justify-center items-center',  
    input: 'border border-zinc-300 p-2 rounded-lg w-64 focus:outline-none focus:border-green-500 mr-4',
    button: 'bg-green-500 text-white p-2 rounded-lg hover:bg-green-600',
    list: 'list-disc pl-5 mt-4 border border-green-300 rounded-lg shadow-md bg-white p-4',
    listItem: 'p-2 border-b border-green-200 last:border-b-0'
};

const App = () => {
  const [startDate, setStartDate] = useState(null);
  const [stockInfo, setStockInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStockData = async () => {
    if (!startDate) return;
    const formattedDate = moment(startDate).format('D-MMMM-YYYY');
    setLoading(true);
    const response = await fetch(`https://jsonmock.hackerrank.com/api/stocks?date=${formattedDate}`);
    const data = await response.json();
    setLoading(false);
    setStockInfo(data.data.length > 0 ? data.data[0] : null);
  };

  return (
    <>
      <div className="bg-zinc-800 p-4 flex items-center justify-center">
          <div className="bg-black p-2 mr-4">
            <img src="https://placehold.co/40x40/000000/00ff00" alt="Logo" className="block" />
          </div>
          <h1 className="text-green-400 text-xl font-semibold">Stock Data</h1>
        </div>
      <div className="bg-white p-10">
          <div className={sharedClasses.maxContainer + ' ' + sharedClasses.flexCenter}>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="d-MMMM-yyyy"
                className={sharedClasses.input}
                placeholderText="5-January-2000"
                wrapperClassName="date-picker"
              />
              <button className={sharedClasses.button} onClick={fetchStockData} data-testid="submit-button">Search</button>
          </div>
      </div>
      {loading && <p>Loading...</p>}
      {!loading && stockInfo ? (
        <ul className={sharedClasses.list} data-testid="stock-data">
          <li className={sharedClasses.listItem}>Open: {stockInfo.open.toFixed(2)}</li>
          <li className={sharedClasses.listItem}>Close: {stockInfo.close.toFixed(2)}</li>
          <li className={sharedClasses.listItem}>High: {stockInfo.high.toFixed(2)}</li>
          <li className={sharedClasses.listItem}>Low: {stockInfo.low.toFixed(2)}</li>
        </ul>
      ) : !loading && !stockInfo && startDate ? (
        <div data-testid="no-result">No Results Found</div>
      ) : null}
    </>
  );
};

export default App;
