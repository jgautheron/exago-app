import React, { Component, PropTypes } from 'react';
import { Card, CardMedia } from 'material-ui/Card';
import { ProjectCardTitle } from 'components';
import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

import { projectChartStyles } from '../ProjectChartStyles/ProjectChartStyles';

@projectChartStyles
export default class ProjectChartScoreSpider extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    palette: PropTypes.object.isRequired,
    labelStyle: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.data = [];
    const criterias = {
      thirdparties: 'Third Parties',
      codestats: 'Code Stats',
      testduration: 'Test Duration',
      testcoverage: 'Test Coverage',
      checklist: 'Checklist',
      lintmessages: 'Linter Messages'
    };

    const data = this.props.data.score;
    data.details.forEach((criteria) => {
      this.data.push({
        name: criterias[criteria.name],
        score: criteria.score,
      });
    });
  }

  render() {
    const { labelStyle, palette: { primary1Color } } = this.props;
    return (
      <Card>
        <ProjectCardTitle title="Grade distribution" />
        <CardMedia>
          <ResponsiveContainer minHeight={300} minWidth={200}>
            <RadarChart data={this.data}>
              <Radar dataKey="score" stroke={primary1Color} fill={primary1Color} fillOpacity={0.9} />
              <PolarGrid />
              <PolarAngleAxis dataKey="name" style={labelStyle} />
              <PolarRadiusAxis style={labelStyle} />
            </RadarChart>
          </ResponsiveContainer>
        </CardMedia>
      </Card>
    );
  }
}
