/**
 * Borrowed this method from stackoverflow
 * http://stackoverflow.com/a/901144
 */
function getParameterByName (name, url) {
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

function getName (name) {
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

function getNavbar (role) {
  var nav = '';
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
              '<li><a onclick="loadClasses(\'' + role + '\')">Classes</a></li>' +
              '<li><a onclick="loadRequests(\'' + role + '\')">Requests</a></li>' +
              '<li><a onclick="loadOrders(\'' + role + '\')">Orders</a></li>' +
            '</ul>';
    break;
    default:
      nav = '<ul>' +
              '<li><a onclick="loadClasses(\'' + role + '\')">Classes</a></li>' +
              '<li><a onclick="loadExams()">Exam dates</a></li>' +
              '<li><a onclick="loadRequests(\'' + role + '\')">Requests</a></li>' +
              '<li><a onclick="loadIndex()">Index</a></li>' +
              '<li><a onclick="loadOrders(\'' + role + '\')">Orders</a></li>' +
            '</ul>';
  }

  return nav;
}

function getOptions(role) {
  var options = '<option></option>';

  for (var i = 0; i < users.length; i++) {
    if(users[i].role === role) {
      options += '<option value="' + users[i].id + '">' + users[i].name + '</option>';
    }
  }

  return options;
}

function updateOptions(user) {
  var dd = document.forms['addClass']['classProfessor'];
  dd.innerHTML += '<option value="' + user.id + '">' + user.name + '</option>';
}

function getClasses () {
  var cls = '';
  if(user.classes) {
    for (var i = 0; i < user.classes.length; i++) {
      for (var j = 0; j < classes.length; j++) {
        if (user.classes[i].id === classes[j].id) {
          if (user.role === 'professor') {
            cls += '<div class="professor">';
            cls += '<table class="fullWidth">';
            cls += '<tr>';
            cls += '<td width="80%"><h4>' + classes[j].name + '</h4></td>';
            cls += '<td width="10%"><p>' + classes[j].enrolled.length + '</p></td>';
            cls += '<td width="10%">';
            for (var k = 0; k < classes[j].exams.length; k++){
              cls += '<small>&emsp;' + classes[j].exams[k] + '</small><br />';
            }
            cls += '</td>';
            cls += '</tr>';
            cls += '</table>';
            cls += '</div>';
          } else {
            var mark = user.classes[i].mark ? user.classes[i].mark : '';
            cls += '<div class="student">'
            cls += '<table class="fullWidth">';
            cls += '<tr>';
            cls += '<td width="80%"><h4>' + classes[j].name + '</h4>';
            cls += '<small><u>Exam dates:</u></small><br />';
            for (var k = 0; k < classes[j].exams.length; k++){
              cls += '<small>&emsp;' + classes[j].exams[k] + '</small><br />';
            }
            cls += '</td>';
            cls += '<td width="10%"><p>' + mark + '</p></td>';
            cls += '</td>';
            cls += '</tr>';
            cls += '</table>';
            cls += '</div>'
          }
        }
      }
    }

  }

  return cls;
}

function getGeneral  () {
  var layout = '';

  switch (user.role) {
    case 'referat':
      layout = '<div class="referat">';
      layout += '<h3>Add student</h3>';
      layout += '<form name="addStudent">';
      layout += '<label>';
      layout += 'First name: ';
      layout += '<input name="firstName" type="text" placeholder="First name" required/>';
      layout += '</label><div class="spacer"></div>';
      layout += '<label>';
      layout += 'Last Name: ';
      layout += '<input name="lastName" type="text" placeholder="Last name" required/>';
      layout += '</label><div class="spacer"></div>';
      layout += '<a id="submit" class="submit" onclick="add(\'student\')">Add</a>';
      layout += '</form>';
      layout += '</div>';

      layout += '<div class="referat">';
      layout += '<h3>Add professor</h3>';
      layout += '<form name="addProfessor">';
      layout += '<label>';
      layout += 'First name: ';
      layout += '<input name="firstName" type="text" placeholder="First name" required/>';
      layout += '</label><div class="spacer"></div>';
      layout += '<label>';
      layout += 'Last Name: ';
      layout += '<input name="lastName" type="text" placeholder="Last name" required/>';
      layout += '</label><div class="spacer"></div>';
      layout += '<a id="submit" class="submit" onclick="add(\'professor\')">Add</a>';
      layout += '</form>';
      layout += '</div>';

      layout += '<div class="referat">';
      layout += '<h3>Add class</h3>';
      layout += '<form name="addClass">';
      layout += '<label>';
      layout += 'Class name: ';
      layout += '<input name="className" type="text" placeholder="Class name" required/>';
      layout += '</label><div class="spacer"></div>';
      layout += '<label>';
      layout += 'Professor: ';
      layout += '<select name="classProfessor">';
      layout += getOptions('professor');
      layout += '</select>'
      layout += '</label><div class="spacer"></div>';
      layout += '<a id="submit" class="submit" onclick="add(\'class\')">Add</a>';
      layout += '</form>';
      layout += '</div>';
    break;
    case 'professor':
      layout = '<div class="professor">';
      layout += '<table class="fullWidth">';
      layout += '<tr>';
      layout += '<th width="80%">Class name</th>';
      layout += '<th width="10%">Students</th>';
      layout += '<th width="10%">Exam dates</th>';
      layout += '</tr>';
      layout += '</table>';
      layout += '</div>';

      layout += getClasses();
    break;
    default:
      layout = '<div class="student">';
      layout += '<table class="fullWidth">';
      layout += '<tr>';
      layout += '<th width="90%">Class name</th>';
      layout += '<th width="10%">Mark</th>';
      layout += '</tr>';
      layout += '</table>';
      layout += '</div>';

      layout += getClasses();
  }

  return layout;
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

  document.getElementById('person').innerHTML = '<p>Hello ' + user.name + '</p>';
  document.getElementById('general').innerHTML = getGeneral();
  document.getElementById('navbar').innerHTML = navbar;
}

var add = function(what) {
  var firstName, lastName;
  switch (what) {
    case 'professor':
      firstName = document.forms['addProfessor']['firstName'].value;
      lastName = document.forms['addProfessor']['lastName'].value;

      var userID = users.length + 1;

      users.push({
        'id': userID,
        'name': firstName + ' ' + lastName,
        'username': firstName.toLowerCase() + lastName.toLowerCase().substring(0,1),
        'password': lastName.toLowerCase() + '4321',
        'role': what,
        'holding': []
      });

      updateOptions({
        'name': firstName + ' ' + lastName,
        'id': userID,
        'role': what
      });

      document.forms['addProfessor']['lastName'].value = '';
      document.forms['addProfessor']['firstName'].value = '';
    break;
    case 'student':
    firstName = document.forms['addStudent']['firstName'].value;
    lastName = document.forms['addStudent']['lastName'].value;

    users.push({
      'id': users.length + 1,
      'name': firstName + ' ' + lastName,
      'username': firstName.toLowerCase() + lastName.toLowerCase().substring(0,1),
      'password': firstName.toLowerCase() + '1234',
      'role': what,
      'enrolled': [],
      'requests': [],
      'orders': []
    });

    document.forms['addStudent']['lastName'].value = '';
    document.forms['addStudent']['firstName'].value = '';
    break;
    case 'class':
    firstName = document.forms['addClass']['className'].value;
    lastName = document.forms['addClass']['classProfessor'].value;

    var classID = classes.length + 1;
    classes.push({
      'id': classID,
      'name': firstName,
      'exams': [],
      'enrolled': []
    });

    if (lastName) {
      for (var i = 0; i < users.length; i++) {
        if (users[i].id.toString() === lastName) {
          users[i].holding.push({
            'id': classID
          });
          break;
        }
      }
    }

    document.forms['addClass']['className'].value = '';
    document.forms['addClass']['classProfessor'].value = '';
    break;
    default:
      console.error('Unrecognized add');
  }
}
