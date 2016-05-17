import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import rd3 from 'rd3';

export default class ProjectCharts extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  componentWillMount() {
    // this.prepareData(this.props.data);
  }

  render() {
    const BarChart = rd3.BarChart;

    const containerStyle = {
      textAlign: 'center'
    };

    const titleStyle = {
      fontWeight: 300,
      fontSize: 26
    };

    const barData = [
      {
        'name': 'Series A',
        'values': [
          { 'x': 1, 'y': 91},
          { 'x': 2, 'y': 290},
          { 'x': 3, 'y': -25},
        ]
      },
      {
        'name': 'Series B',
        'values': [
          { 'x': 1, 'y': 9},
          { 'x': 2, 'y': 49},
          { 'x': 3, 'y': -20},
        ]
      },
      {
        'name': 'Series C',
        'values': [
          { 'x': 1, 'y': 14},
          { 'x': 2, 'y': 77},
          { 'x': 3, 'y': -70},
        ]
      }
    ];

    return (
      <Card style={containerStyle}>
        <CardHeader
          title="Test coverage per package"
          titleStyle={titleStyle}
        />
        <CardMedia>
          <BarChart
            data={barData}
            width={450}
            height={400} />
        </CardMedia>
      </Card>
    );
  }
}
