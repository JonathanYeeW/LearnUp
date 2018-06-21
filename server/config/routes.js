console.log("<> server <> config <> routes.js <> HERE <>")

// //////////////////////////////////////////////////////////////
//  SERVER/CONFIG/ROUTES.JS FILE
// //////////////////////////////////////////////////////////////
// NOTE: "app" express application is passed to the current file
// from the server.js file when the node server starts.

// Require controller.js file and set it to a variable:
// ( Change the "controller" variable name and the controller file name
// within the 'controllers' directory. )
const users = require('../controllers/users.js');
const tiles = require('../controllers/tiles.js');

// Export all routes to server.js:
module.exports = function (app) {
  // Root route - renders index.ejs view (for socket.io example):
  app.get('/', (request, response) => {
    console.log("<> server <> config <> routes.js <> app.get('/') <>")
    console.log("<> render index.ejs")
    console.log("")
    response.render('index', { message: request.flash('error') });
  });

  app.get ('/forgetpw',(request, response) =>{
    console.log("<> server <> config <> routes.js <> app.get('/forgetpw') <>")
    console.log("<> render forgetpw")
    console.log("")
    response.render('forgetpw', { message: request.flash('error') });
  })

  app.get('/admin/dashboard', (request, response) => {
    console.log("<> server <> config <> routes.js <> app.get('/admin/dashboard') <>")
    if (request.session.user) {
      //MARK: What is users.dashboard?
      users.dashboard(request, response);
    } else {
      response.redirect('/');
    }
  });
  // Admin route - renders admin.ejs:
  // app.get('/index', (request, response) => {
  //   response.render('index', { message: request.flash('error') });
  // });

  app.get('/logout', (request, response) => {
    console.log("<> server <> config <> routes.js <> app.get('/logout') <>")
    request.session.destroy();
    response.redirect('/');
  });

  // enter an individual learnup room

  app.get('/room/:id', (request, response) => {
    console.log("<> server <> config <> routes.js <> app.get('/room/:id') <>")
    users.enterRoom(request, response);
  });

  app.get('/tiles', (request, response) => {
    console.log("<> server <> config <> routes.js <> app.get('/tiles') <>")
    tiles.getTiles(request, response);
  });

    // Class has ended, render page with message
    app.get('/end', (request, response) => {
      console.log("<> server <> config <> routes.js <> app.get('/end') <>")
      console.log("<> render endOfClass")
      console.log("")
      response.render('endOfClass');
    });  

  app.post('/login', (request, response) => {
    console.log("<> server <> config <> routes.js <> app.post('/login') <>")
    users.login(request, response);
  });

  // New user post route
  app.post('/new', (request, response) => {
    console.log("<> server <> config <> routes.js <> app.post('/new') <>")
    users.newUser(request, response);
  });

  app.post('/edit', (request, response) => {
    console.log("<> server <> config <> routes.js <> app.post('/edit') <>")
    users.editUser(request, response);
  });

  app.post('/promote/:id', (request, response) => {
    console.log("<> server <> config <> routes.js <> app.post('/promote/:id') <>")
    users.promote(request, response, 1);
  });

  app.post('/demote/:id', (request, response) => {
    console.log("<> server <> config <> routes.js <> app.post('/demote/:id') <>")
    users.promote(request, response, -1);
  });

  app.post('/delete/:id', (request, response) => {
    console.log("<> server <> config <> routes.js <> app.post('/delete/:id') <>")
    users.delete(request, response);
  });

  app.post('/forgetpassword', (request, response) => {
    console.log("<> server <> config <> routes.js <> app.post('/forgetpassword') <>")
    users.forgetpassword(request, response)
  });

  app.get('/reset/:token', (request, response) => {
    console.log("<> server <> config <> routes.js <> app.post('/reset/:token') <>")
    users.getUserinforgetpw(request, response)
  });

  app.post('/resetpw',(request, response) => {
    console.log("<> server <> config <> routes.js <> app.post('/resetpw') <>")
    users.resetpassword(request, response)
  })

  // app.get('/tiles', tiles.getTiles);

  // // Class has ended, render page with message
  // app.get('/end', (request, response) => {
  //   response.render('endOfClass');
  // });  

  // app.post('/login', users.login);

  // // New user post route
  // app.post('/new', users.newUser);

  // app.post('/edit', users.editUser);

  // app.post('/promote/:id', users.promote);

  // app.post('/demote/:id', users.demote);

  // app.post('/delete/:id', users.delete);

  // app.post('/forgetpassword', users.forgetpassword);

  // app.get('/reset/:token', users.getUserinforgetpw);

  // app.post('/resetpw', users.resetpassword)
};
