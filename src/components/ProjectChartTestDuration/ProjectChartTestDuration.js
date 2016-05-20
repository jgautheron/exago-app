import React, { Component, PropTypes } from 'react';
import { Card, CardHeader, CardMedia } from 'material-ui/Card';
import ReactHighcharts from 'react-highcharts';

export default class ProjectChartTestDuration extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.config = {
      chart: {
        type: 'column'
      },
      title: {
        style: {
          display: 'none'
        }
      },
      legend: {
        enabled: false
      },
      xAxis: {
        type: 'category',
        categories: []
      },
      yAxis: {
        title: {
          text: 'Execution time in seconds'
        }
      },
      tooltip: {
        pointFormat: '{point.name} <b>{point.y:.2f}s</b>'
      },
      series: [{
        name: 'Coverage',
        colorByPoint: true,
        data: []
      }]
    };

    const data = this.props.data.testresults;
    data.packages.forEach((pkg) => {
      this.config.xAxis.categories.push(pkg.name);
      this.config.series[0].data.push(pkg.execution_time);
    });
  }

  render() {
    const titleStyle = {
      fontWeight: 300,
      fontSize: 26
    };

    return (
      <Card>
        <CardHeader
          title="Test duration per package"
          titleStyle={titleStyle}
        />
        <CardMedia>
          <ReactHighcharts config={this.config} />
        </CardMedia>
      </Card>
    );
  }
}
