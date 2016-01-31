// Sets app default base URL
let baseUrl = '/';

if (window.location.port === '') {  // if production
  page.base(baseUrl.replace(/\/$/, ''));
}

let app = document.getElementById('app');

window.addEventListener('upgraded', () => {
  app.baseUrl = baseUrl;
});

// Utility function to listen to an event on a node once.
function once(node, event, fn, args) {
  var self = this;
  var listener = function() {
    fn.apply(self, args);
    node.removeEventListener(event, listener, false);
  };
  node.addEventListener(event, listener, false);
}

// Middleware
function scrollToTop(ctx, next) {
  function setData() {
    app.scrollPageToTop();
  }

  // Check if element prototype has not been upgraded yet
  if (!app.upgraded) {
    once(app, 'upgraded', setData);
  } else {
    setData();
  }
  next();
}

function initProject() {
  let project = document.querySelector('#project');
  project.registry = app.params.registry;
  project.username = app.params.username;
  project.repository = app.params.repository;
  project.fullName = app.params.registry + '/' + app.params.username + '/' + app.params.repository;
}

// Routes
page('*', scrollToTop, (ctx, next) => {
  next();
});

page('/', () => {
  function setData() {
    app.route = 'home';
  }

  // Check if element prototype has not been upgraded yet
  if (!app.upgraded) {
    once(app, 'upgraded', setData);
  } else {
    setData();
  }
});

page('/about', () => {
  function setData() {
    app.route = 'about';
  }

  // Check if element prototype has not been upgraded yet
  if (!app.upgraded) {
    once(app, 'upgraded', setData);
  } else {
    setData();
  }
});

page('/project/:registry/:username/:repository', data => {
  function setData() {
    app.route = 'project';
    app.params = data.params;
    initProject();
  }

  // Check if element prototype has not been upgraded yet
  if (!app.upgraded) {
    once(app, 'upgraded', setData);
  } else {
    setData();
  }
});

page('/project/:registry/:username/:repository/file/*', data => {
  function setData() {
    app.route = 'file';
    app.params = data.params;

    initProject();

    let file = document.querySelector('#file');
    file.registry = app.params.registry;
    file.username = app.params.username;
    file.repository = app.params.repository;
    file.fullName = app.params.registry + '/' + app.params.username + '/' + app.params.repository;
    file.path = app.params[0];

    let cd = document.querySelector('code-displayer');
    let editor = document.querySelector('code-displayer #codeMirror');
    if (editor) {
      editor.style.opacity = 0;
      cd.showContent();
    }
  }

  // Check if element prototype has not been upgraded yet
  if (!app.upgraded) {
    once(app, 'upgraded', setData);
  } else {
    setData();
  }
});

// 404
page('*', data => {
  page.redirect('/');
});

page({
  hashbang: false
});