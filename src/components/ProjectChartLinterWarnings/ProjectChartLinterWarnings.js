import React, { Component, PropTypes } from 'react';
import { Card, CardMedia } from 'material-ui/Card';
import ProjectCardTitle from '../ProjectCardTitle/ProjectCardTitle';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import { projectChartStyles } from '../ProjectChartStyles/ProjectChartStyles';

export class ProjectChartLinterWarnings extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    palette: PropTypes.object.isRequired,
    pieColors: PropTypes.array.isRequired,
    labelStyle: PropTypes.object.isRequired,
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
    const radian = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, value }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 1.25;
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

    const { pieColors, palette: { primary1Color } } = this.props;

    return (
      <Card>
        <ProjectCardTitle title="Most warnings per linter" />
        <CardMedia>
          <ResponsiveContainer minHeight={300} minWidth={200}>
            <PieChart>
              <Pie
                data={this.data}
                fill={primary1Color}
                label={renderCustomizedLabel}
              >
                {
                  this.data.map((entry, index) => <Cell key={index} fill={pieColors[index % pieColors.length]} />)
                }
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardMedia>
      </Card>
    );
  }
}

export default projectChartStyles(ProjectChartLinterWarnings);
