/**
 * Borrowed this method from stackoverflow
 * http://stackoverflow.com/a/901144
 */
var getParameterByName = function (name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var getName = function (name) {
  name = name.replace(/č/g, '&ccaron;');
  name = name.replace(/š/g, '&scaron;');
  name = name.replace(/ž/g, '&zcaron;');
  name = name.replace(/ć/g, '&cacute;');
  name = name.replace(/đ/g, '&dstrok;');
  name = name.replace(/Č/g, '&Ccaron;');
  name = name.replace(/Š/g, '&Scaron;');
  name = name.replace(/Ž/g, '&Zcaron;');
  name = name.replace(/Ć/g, '&Cacute;');
  name = name.replace(/Đ/g, '&Dstrok;');

  return name;
}

var getNavbar = function (role) {
  var nav;
  switch (role) {
    case 'professor':
      nav = '<ul>' +
              '<li><a onclick="loadClasses()">Classes</a></li>' +
              '<li><a onclick="loadExams()">Exam dates</a></li>' +
            '</ul>';
    break;
    case 'referat':
      nav = '<ul>' +
              '<li><a onclick="loadStudents()">Students</a></li>' +
              '<li><a onclick="loadProfessors()">Professors</a></li>' +
              '<li><a onclick="loadClasses(\'' + user.role + '\')">Classes</a></li>' +
              '<li><a onclick="loadRequests(\'' + user.role + '\')">Requests</a></li>' +
              '<li><a onclick="loadOrders(\'' + user.role + '\')">Orders</a></li>' +
            '</ul>';
    break;
    default:
      nav = '<ul>' +
              '<li><a onclick="loadClasses(\'' + user.role + '\')">Classes</a></li>' +
              '<li><a onclick="loadExams()">Exam dates</a></li>' +
              '<li><a onclick="loadRequests(\'' + user.role + '\')">Requests</a></li>' +
              '<li><a onclick="loadIndex()">Index</a></li>' +
              '<li><a onclick="loadOrders(\'' + user.role + '\')">Orders</a></li>' +
            '</ul>';
  }

  return nav;
}

var user;

var getData = function () {
  var uname = getParameterByName('uname');
  var navbar;
  for (var i = 0; i < users.length; i++) {
    if(users[i].username === uname) {
      var name = getName(users[i].name);
      navbar = getNavbar(users[i].role);
      user = {
        'id': users[i].id,
        'name': name,
        'role': users[i].role,
        'classes': users[i].enrolled ? users[i].enrolled : users[i].holding
      };
      break;
    }
  }

  document.getElementById('navbar').innerHTML = navbar;
  document.getElementById('person').innerHTML = '<p>Hello ' + user.name + '</p>';
}
