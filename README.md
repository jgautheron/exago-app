# Exago [![Circle CI](https://circleci.com/gh/exago/app.svg?style=svg)](https://circleci.com/gh/exago/app) [![](https://badge.imagelayers.io/jgautheron/exago:latest.svg)](https://imagelayers.io/?images=jgautheron/exago:latest 'Get your own badge on imagelayers.io')

Exago is a code quality tool that inspects your Go repository and reports on what could be improved. The dashboard displays metrics that we consider as your application pillars, you can dive deeper and browse directly the recommandations in the code.

This is the front-end visible on [exago.io](http://www.exago.io). It is based on the [Polymer Starter Kit Plus](https://github.com/StartPolymer/polymer-starter-kit-plus).

## Getting started

### Development

For development you will need the latest version of `npm` installed.  
See how to install NodeJS for [OSX](http://coolestguidesontheplanet.com/installing-node-js-osx-10-9-mavericks/), [Linux](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server) and [Windows](http://blog.teamtreehouse.com/install-node-js-npm-windows).

*1.* Install all the project dependencies with `npm`

    $ npm run install-all

*2.* Download the fonts

    $ gulp download:fonts

*3.* Run the development server

    $ gulp serve

Then head to `http://localhost:3000/`.  
The development server will automatically recompile static assets and reload the changes in your browser.

### API

Without Exago's backend service available, you won't be able to test most of the application.  
You have two options:

1. Leave the endpoint configured to `exago.io`, then you have only one thing to do: [bypass CORS errors](https://blog.nraboy.com/2014/08/bypass-cors-errors-testing-apis-locally/).
2. [Roll your own](https://github.com/exago/svc).

The backend URL is set [here](https://github.com/exago/app/blob/master/app/scripts/app.js#L7), the domain is automatically replaced by `localhost` in a development environment.  
If you would like to keep it as `exago.io`, comment [this line](https://github.com/exago/app/blob/master/tasks/js-babel.js#L22).

## Contributing

See the [dedicated page](CONTRIBUTING.md).
