var users = [
  {
    'id': 1,
    'username': 'adrianj',
    'password': 'adrian1234'
  },
  {
    'id': 2,
    'username': 'janezn',
    'password': 'novak4321'
  }
]



var login = function () {
  var uname = document.forms['loginForm']['username'].value;
  var pass = document.forms['loginForm']['password'].value;

  var error = document.getElementsByClassName('error');

  for (var i = 0; i < users.length; i++) {
    if (uname === users[i].username) {
      if (pass === users[i].password) {
        return true;
      } else {
        error[0].innerHTML = '<p>You entered wrong password</p>';
        return false;
      }
    }
  }

  error[0].innerHTML = '<p>You entered wrong username</p>';

  return false;
}
