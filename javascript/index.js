var login = function () {
  var uname = document.forms['loginForm']['username'].value;
  var pass = document.forms['loginForm']['password'].value;

  var link = document.getElementById('submit');

  var error = document.getElementsByClassName('error');

  var userFound = false;

  for (var i = 0; i < users.length; i++) {
    if (uname === users[i].username) {
      userFound = true;
      if (pass === users[i].password) {
          link.href = 'first.html';
          localStorage.setItem('user', JSON.stringify(
            {
              'id': users[i].id,
              'name': users[i].name,
              'role': users[i].role,
              'classes': users[i].enrolled ? users[i].enrolled : users[i].holding
            }
          ));
      } else {
        error[0].innerHTML = '<p>You entered wrong password</p>';
      }
    }
  }

  if(!userFound){
    error[0].innerHTML = '<p>You entered wrong username</p>';
  }

  return false;
}
