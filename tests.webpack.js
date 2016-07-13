var context = require.context('./src', true, /-test\.js$/);
context.keys().forEach(context);

// require all `src/containers/**/index.js`
const containers = require.context('./src/containers/', true, /index\.js$/);
containers.keys().forEach(containers);
