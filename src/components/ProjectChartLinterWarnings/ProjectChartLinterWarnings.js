import React, { Component, PropTypes } from 'react';
import { Card, CardHeader, CardMedia } from 'material-ui/Card';
import ReactHighcharts from 'react-highcharts';

export default class ProjectChartLinterWarnings extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.config = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        style: {
          display: 'none'
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b> warnings'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Coverage',
        colorByPoint: true,
        data: []
      }]
    };

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
      this.config.series[0].data.push({
        name: linter,
        y: linters[linter],
      });
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
          title="Most warnings per linter"
          titleStyle={titleStyle}
        />
        <CardMedia>
          <ReactHighcharts config={this.config} />
        </CardMedia>
      </Card>
    );
  }
}
