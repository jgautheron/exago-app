/*  global Choose, When, Otherwise */

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Share from 'material-ui/svg-icons/social/share';
import IconButton from 'material-ui/IconButton';

import { palette } from '../../theme';

// gophers map images (svg)
//  0 - orginal
//  1 - fly
//  2 - workout
//  3 - drunk stars above head
//  4 - air baloon
//  5 - beer
//  6 - pirate
//  7 - gun
//  8 - tree
//  9 - donut
// 10 - jumping on stars
// 11 - junior gopher swimming
// 12 - wizard
// 13 - rock
// 14 - astronaut
// 15 - gift
// 16 - teaching
// 17 - sick starts above head
// 18 - sherif
// 19 - making sock
// 20 - holding baloon
// 21 - baby gopher
// 22 - bird on head
// 23 - hula hop
// 24 - bday
// 25 - worker
// 26 - wizard 2
// 27 - flower
// 28 - cooking
// 29 - bikini
// 30 - bikini 2
// 31 - mustache
// 32 - dress
// 33 - clothes

const TWITTER_ENDPOINT = 'https://twitter.com/intent/tweet?text=';
const TWITTER_MSG = {
  A: [
    { text: '🎸 Your project rocks! You deserve an A rank!', img: [10, 13] },
    { text: '😲 Project created by true Gopher! Get\'s an A!', img: [0, 25, 22, 10] },
    { text: '🚀 Huston we have an A project!', img: [14] },
    { text: '👏 Your project is amazing! Are you a Gopher wizard?', img: [12, 26] },
    { text: '🍗 Mmmmm smells like an A ranked project!', img: [28, 9, 27] },
    { text: '✨ Projects follows the Go-way!', img: [0, 16, 10, 23, 31, 33] },
    { text: '🎂 Congrats you have an A project!', img: [27, 24, 20, 15, 9] }
  ],
  B: [
    { text: '💠 Really nice looking project', img: [32, 30, 29, 22, 25] }
  ],
  C: [
    { text: '📚 Not bad. Keep training Go!', img: [2, 11, 16, 19, 23] }
  ],
  D: [
    { text: '🍺 Don\'t drink and code! It\'s a D project ', img: [3, 17, 5] }
  ],
  E: [
    { text: '🖥 It\'s a E ranked project. Do you even code bro?', img: [21, 22] }
  ],
  F: [
    { text: '💩 Hooray! Your project gets strong F!', img: [24, 21, 3, 17] },
    { text: '💼 Your project is really bad. Change job!!!', img: [29, 30, 28, 19, 25] },
    { text: '⌨ Author of this repo - PLEASE DON\'T CODE MORE', img: [7, 6, 17, 18] },
    { text: '⌨ Worst repo ever! Please quit programming...', img: [3, 7, 17] },
    { text: '🔥 Kill it with fire! It\'s an F ranked repo', img: [7, 3, 17] },
    { text: '✈ Nothing to do here! It\'s a F project!', img: [1, 4, 11, 20] }
  ]
};

import React, { Component, PropTypes } from 'react';

export default class ProjectShare extends Component {
  static propTypes = {
    repository: PropTypes.string.isRequired,
    rank: PropTypes.string.isRequired
  }

  state = {
    open: false
  }

  getShare = () => {
    const rank = this.props.rank && this.props.rank[0];

    if (!rank) {
      return { msg: 'Your project has an error', img: 3 };
    }

    const pickedMsg = TWITTER_MSG[rank][Math.floor(Math.random() * TWITTER_MSG[rank].length)];
    const msg = pickedMsg.text;
    const img = pickedMsg.img[Math.floor(Math.random() * pickedMsg.img.length)];

    return { msg, img };
  }

  shareOnTwitter = (message) => {
    this.closeShare();
    const tweet = encodeURIComponent(message);

    window.open(TWITTER_ENDPOINT + tweet);
  }

  openShare = () => {
    this.setState({
      open: true
    });
  }

  closeShare = () => {
    this.setState({
      open: false
    });
  }

  render() {
    const { msg, img } = this.getShare();
    const toTweet = `${msg}\n[http://exago.io/project/${this.props.repository}]`;
    const gopherImage = require(`./gophers/${img}.svg`); // eslint-disable-line global-require

    const shareActions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.closeShare}
      />,
      <FlatButton
        label="Share!"
        primary
        onTouchTap={() => this.shareOnTwitter(toTweet)}
      />,
    ];

    return (
      <div>
        <Dialog
          actions={shareActions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.closeShare}
        >
          <div>
            <img
              alt="Exago Rank"
              style={{ float: 'left', marginRight: 20, maxHeight: 184 }}
              src={gopherImage}
            />
            <div style={{ float: 'left', width: '50%' }}>
              <h1>Your project has {this.props.rank} rank!</h1>
              Would you like to share your it on Twitter?
              <p><strong>{toTweet}</strong></p>
            </div>
          </div>
        </Dialog>
        <IconButton
          tooltip="Share on Twitter"
          tooltipPosition="bottom-center"
          style={{ zIndex: 500 }}
          onClick={this.openShare}
          disabled={!this.props.rank}
        >
          <Share color={palette.disabledColor} hoverColor={palette.textColor} />
        </IconButton>
      </div>
    );
  }
}
