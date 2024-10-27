import { useQuery } from '@tanstack/react-query';
import './App.css';
import { fetchHistoricalRates } from './api/conversionRateApi';
import { Line } from 'react-chartjs-2';
import { CategoryScale, Chart, LinearScale, LineElement, PointElement } from 'chart.js';
Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

function App() {
  const {data: historicalRates, isLoading} = useQuery({
    queryKey: ['get-historical-rates'],
    queryFn: fetchHistoricalRates
  })

  if (!historicalRates || isLoading) {
    return <p>Loading..</p>
  }

  const chartData = {
    labels: historicalRates.map((rate) => new Date(rate.timestamp).toLocaleString()),
    datasets: [
      {
        label: 'pufETH Conversion Rate',
        data: historicalRates.map((rate) => rate.rate),        
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="App">
      <header className="">
        pufETH Conversion Rate
      </header>
      <section>
        <Line data={chartData} />
      </section>
    </div>
  );
}

export default App;
