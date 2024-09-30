import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function Chartd3(props) {
    const chartRef = useRef(null);

    useEffect(() => {

        const data = props.data;

        const width = 400;
        const height = 400;
        const radius = Math.min(width, height) / 2;

        const svg = d3.select(chartRef.current)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        const pie = d3.pie()
            .value(d => d.value);

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const arcs = svg.selectAll('arc')
            .data(pie(data))
            .enter()
            .append('g')
            .attr('class', 'arc');

        arcs.append('path')
            .attr('d', arc)
            .attr('fill', d => color(d.data.label));

        return () => {
            d3.select(chartRef.current).select('svg').remove();
        };
    }, [props.data]);

    return (
        <article className="text-box" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ width: '400px', height: '400px' }}>
                <h2 style={{ textAlign: 'center' }}>chartD3: budget</h2>
                <div ref={chartRef} style={{ width: '100%', height: '100%' }}></div>
            </div>
        </article>
    );
}

export default Chartd3;
