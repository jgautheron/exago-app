import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class About extends Component {
  render() {
    return (
      <div>
        <Helmet title="About Us"/>
        <h3>How it works?</h3>
        <p>Exago is running on top of Lambda for most of its tasks, which keeps it fast and scalable.<br/>
        Read more about the inner workings <a href="">in this article.</a></p>

        <h3>Roadmap</h3>
        Check out the project's roadmap on <a href="https://trello.com/b/IJ3UQ1nJ/exago-roadmap">Trello</a>, propose ideas, +1 features and contribute!

        <h3>Credits</h3>
        <ul>
            <li><a href="https://twitter.com/christopheeble" target="_blank">Christophe Eble</a></li>
            <li><a href="https://twitter.com/karolgorecki" target="_blank">Karol Górecki</a></li>
        </ul>

        <p>Copyright 2016 Jonathan Gautheron - <a href="https://twitter.com/jgautheron" target="_blank">Twitter</a> - <a href="https://github.com/jgautheron" target="_blank">Github</a></p>
      </div>
    );
  }
}
