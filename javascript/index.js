var users = [
  {
    'id': 1,
    'username': 'adrianj',
    'password': 'adrian1234',
    "role": "student"
  },
  {
    'id': 2,
    'username': 'janezn',
    'password': 'novak4321',
    "role": "professor"
  },
  {
    'id': 3,
    'username': 'metak',
    'password': 'metkriz12',
    "role": "referat"
  }
]



var login = function () {
  var uname = document.forms['loginForm']['username'].value;
  var pass = document.forms['loginForm']['password'].value;
  var link = document.getElementById('submit');

  var error = document.getElementsByClassName('error');

  for (var i = 0; i < users.length; i++) {
    if (uname === users[i].username) {
      if (pass === users[i].password) {
        switch (users[i].role){
          case 'professor':
            link.href = 'professor.html';
            break;
          case 'referat':
            link.href = 'referat.html';
            break;
          case 'student':
            link.href = 'student.html';
            break;
          default:
            link.href = 'student.html';
        }
      } else {
        error[0].innerHTML = '<p>You entered wrong password</p>';

        return false;
      }
    }
  }

  error[0].innerHTML = '<p>You entered wrong username</p>';

  return false;
}
