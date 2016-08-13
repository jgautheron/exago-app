import React, { Component, PropTypes } from 'react';
import { Card, CardTitle, CardMedia } from 'material-ui/Card';
import ReactHighcharts from 'react-highcharts';
import highchartsMore from 'highcharts-more';

export default class ProjectChartScoreSpider extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  componentWillMount() {
    highchartsMore(ReactHighcharts.Highcharts);

    const criterias = {
      thirdparties: 'Third Parties',
      codestats: 'Code Stats',
      testduration: 'Test Duration',
      testcoverage: 'Test Coverage',
      checklist: 'Checklist',
      lintmessages: 'Lint Messages'
    };

    this.config = {
      chart: {
        polar: true,
        type: 'line'
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
        categories: [],
        tickmarkPlacement: 'on',
        lineWidth: 0
      },
      yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0,
        max: 100
      },
      tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.3f}</b><br/>'
      },
      series: [{
        name: 'Score',
        data: [],
        pointPlacement: 'on'
      }]
    };

    const data = this.props.data.score;
    data.details.forEach((criteria) => {
      this.config.xAxis.categories.push(criterias[criteria.name]);
      this.config.series[0].data.push(criteria.score);
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
          title="Grade distribution"
          titleStyle={titleStyle}
        />
        <CardMedia>
          <ReactHighcharts config={this.config} />
        </CardMedia>
      </Card>
    );
  }
}
