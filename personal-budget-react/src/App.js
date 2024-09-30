import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import Footer from './Footer/Footer';
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';
import ChartPie from './ChartPie/ChartPie';
import Chartd3 from './Chartd3/Chartd3';
import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [dataSourceD3, setDataSourceD3] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
        ],
      }
    ],
  });


  useEffect(() => {
    axios.get('http://localhost:3000/budget')
      .then((res) => {
        const budgetData = res.data.myBudget;
        setDataSourceD3(budgetData);

        const budgetValues = budgetData.map(item => item.budget);
        const budgetTitles = budgetData.map(item => item.title);

        setChartData({
          labels: budgetTitles,
          datasets: [
            {
              data: budgetValues,
              backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
              ],
            }
          ],
        });
      })
      .catch((error) => {
        console.error('Error fetching budget data:', error);
      });
  }, []);

  const transformedData = dataSourceD3.map(item => ({
    label: item.title,
    value: item.budget
  }));

  return (
    <div className="App">
      <Router>
        <Menu />
        <Hero />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <ChartPie dataSource={chartData} />
        <Chartd3 data={transformedData} />
        <Footer />
      </Router>
    </div>
  );
}

export default App;