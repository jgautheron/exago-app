import React, { Component, PropTypes } from 'react';
import { Card, CardTitle, CardMedia } from 'material-ui/Card';
import ReactHighcharts from 'react-highcharts';

export default class ProjectChartCodeCoverage extends Component {
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
          text: 'Code coverage in %'
        }
      },
      tooltip: {
        pointFormat: '{point.name} <b>{point.y:.2f}%</b>'
      },
      series: [{
        name: 'Coverage',
        colorByPoint: true,
        data: []
      }]
    };

    const data = this.props.data.projectrunner;
    data.packages.forEach((pkg) => {
      this.config.xAxis.categories.push(pkg.name);
      this.config.series[0].data.push(pkg.coverage);
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
          <ReactHighcharts config={this.config} />
        </CardMedia>
      </Card>
    );
  }
}
