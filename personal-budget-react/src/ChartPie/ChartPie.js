import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import {CategoryScale, LinearScale, Title, Tooltip} from 'chart.js';

Chart.register(CategoryScale, LinearScale, Title, Tooltip);

function ChartPie(props) {
  return (
    <article className="text-box" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Pie Chart: budget</h2>
      <div style={{ width: '400px', height: '400px' }}>
        <Pie data={props.dataSource} />
      </div>
    </article>
  );
}

export default ChartPie;
