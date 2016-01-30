window.addEventListener('WebComponentsReady', () => {
  // Middleware
  function scrollToTop(ctx, next) {
    app.scrollPageToTop();
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
    app.route = 'home';
  });

  page('/about', () => {
    app.route = 'about';
  });

  page('/project/:registry/:username/:repository', data => {
    app.route = 'project';
    app.params = data.params;

    initProject();
  });

  page('/project/:registry/:username/:repository/file/*', data => {
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
  });

  // 404
  page('*', data => {
    page.redirect('/');
  });

  page({
    hashbang: false
  });

});
