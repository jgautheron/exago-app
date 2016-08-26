import React, { Component, PropTypes } from 'react';
import { Card, CardTitle, CardMedia } from 'material-ui/Card';
import { PieChart, Pie, Cell } from 'recharts';

export default class ProjectChartLinterWarnings extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.data = [];
    const data = this.props.data.lintmessages;

    // Extract linters and the amount of warnings
    const linters = {};
    Object.keys(data).forEach((filename) => {
      Object.keys(data[filename]).forEach((linter) => {
        if (!linters.hasOwnProperty(linter)) {
          linters[linter] = 0;
        }
        linters[linter] += data[filename][linter].length;
      });
    });

    Object.keys(linters).forEach((linter) => {
      this.data.push({
        name: linter,
        value: linters[linter],
      });
    });
  }

  render() {
    const titleStyle = {
      fontWeight: 300,
      fontSize: 26
    };

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const radian = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, value }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 1.35;
      const x = cx + radius * Math.cos(-midAngle * radian);
      const y = cy + radius * Math.sin(-midAngle * radian);

      return (
        <text
          x={x}
          y={y}
          fill="black"
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central"
          style={{ fontSize: 11, fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
        >
          {`${name}: ${value}`}
        </text>
      );
    };

    return (
      <Card>
        <CardTitle
          title="Most warnings per linter"
          titleStyle={titleStyle}
        />
        <CardMedia>
          <PieChart width={800} height={400}>
            <Pie
              isAnimationActive={false}
              data={this.data}
              cx={200}
              cy={200}
              outerRadius={80}
              fill="#8884d8"
              label={renderCustomizedLabel}
            >
              {
                this.data.map((entry, index) => <Cell fill={colors[index % colors.length]} />)
              }
            </Pie>
          </PieChart>
        </CardMedia>
      </Card>
    );
  }
}
