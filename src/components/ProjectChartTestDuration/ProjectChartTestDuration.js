import React, { Component, PropTypes } from 'react';
import { Card, CardMedia } from 'material-ui/Card';
import ProjectCardTitle from '../ProjectCardTitle/ProjectCardTitle';
import { ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from 'recharts';

import { projectChartStyles } from '../ProjectChartStyles/ProjectChartStyles';

export class ProjectChartTestDuration extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    palette: PropTypes.object.isRequired,
    labelStyle: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.data = [];
    const data = this.props.data.projectrunner.test.data;
    data.forEach((pkg) => {
      this.data.push({ name: pkg.name, duration: pkg.execution_time });
    });
  }

  render() {
    const { labelStyle, palette: { primary1Color } } = this.props;
    return (
      <Card>
        <ProjectCardTitle title="Test duration per package" />
        <CardMedia>
          <ResponsiveContainer minHeight={300} minWidth={200}>
            <BarChart data={this.data}>
              <XAxis dataKey="name" hide />
              <YAxis style={labelStyle} />
              <CartesianGrid strokeDasharray="5 5" />
              <Tooltip />
              <Bar dataKey="duration" fill={primary1Color} label style={labelStyle} />
            </BarChart>
          </ResponsiveContainer>
        </CardMedia>
      </Card>
    );
  }
}

export default projectChartStyles(ProjectChartTestDuration);
