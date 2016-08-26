import React, { Component, PropTypes } from 'react';
import { Card, CardTitle, CardMedia } from 'material-ui/Card';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from 'recharts';

export default class ProjectChartCodeCoverage extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.data = [];
    const data = this.props.data.projectrunner;
    data.packages.forEach((pkg) => {
      this.data.push({ name: pkg.name, coverage: pkg.coverage });
    });
  }

  render() {
    const titleStyle = {
      fontWeight: 300,
      fontSize: 26
    };

    return (
      <Card>
        <CardTitle
          title="Code coverage per package"
          titleStyle={titleStyle}
        />
        <CardMedia>
          <BarChart width={400} height={300} data={this.data}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Bar dataKey="coverage" fill="#8884d8" />
          </BarChart>
        </CardMedia>
      </Card>
    );
  }
}
