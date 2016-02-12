# Exago

## Guide for Contributors

Exago's mission extends in many areas, code quality is critical and spotting issues early has never been so important as software engineering continuously evolves.  

### Roadmap

If you would like to contribute but do not necessarily know what you could do, check out our [roadmap](https://trello.com/b/IJ3UQ1nJ/exago-roadmap).
:warning: Before you start working on something, make sure someone is not already doing it!

### Getting started

Create a branch per feature. Rebase your commits, keep it clean and readable.

Before sending a PR:

1. Run `gulp lint-js` and make sure nothing bad comes up (such as a missing semicolon, this will break vulcanization)
2. Run `serve:dist` and see if no error comes up in the log
