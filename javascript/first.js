function getNavbar () {
  var nav = '';
  switch (user.role) {
    case 'professor':
      nav = '<ul>' +
              '<li><a class="strong" href="first.html">Classes</a></li>' +
              '<li><a href="" onclick="loadExams()">Exam dates</a></li>' +
            '</ul>';
    break;
    case 'referat':
      nav = '<ul>' +
              '<li><a href="" onclick="loadStudents()">Students</a></li>' +
              '<li><a href="" onclick="loadProfessors()">Professors</a></li>' +
              '<li><a href="" onclick="loadClasses(\'' + user.role + '\')">Classes</a></li>' +
              '<li><a href="" onclick="loadRequests(\'' + user.role + '\')">Requests</a></li>' +
              '<li><a href="" onclick="loadOrders(\'' + user.role + '\')">Orders</a></li>' +
            '</ul>';
    break;
    default:
      nav = '<ul>' +
              '<li><a class="strong" href="first.html">Classes</a></li>' +
              '<li><a href="student/dates.html")">Exam dates</a></li>' +
              '<li><a href="student/requests.html">Requests</a></li>' +
              '<li><a href="student/index.html">Index</a></li>' +
              '<li><a href="student/orders.html">Orders</a></li>' +
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
  if(user.role === 'professor') {
    var dd = document.forms['addClass']['classProfessor'];
    dd.innerHTML += '<option value="' + user.id + '">' + user.name + '</option>';
  }
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

function getFirst  () {
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

function getStudentRequests () {
  var layout;
  layout = '<div class="student">';
  layout += '<table class="fullWidth">';
  layout += '<tr>';
  layout += '<th width="20%">Request name</th>';
  layout += '<th width="80%">Request description</th>';
  layout += '</tr>';
  layout += '</table>';
  layout += '</div>';

  for (var i = 0; i < requests.length; i++) {
    layout += '<div class="student">';
    layout += '<table class="fullWidth">';
    layout += '<tr>';
    layout += '<th width="20%"><a href="request.html" onclick="loadStudentRequest(' + requests[i].id + ')">' +
              requests[i].name + '</a></th>';
    layout += '<td width="80%">' + requests[i].shortDescription + '</td>';
    layout += '</tr>';
    layout += '</table>';
    layout += '</div>';
  }

  return layout;
}

function loadRequest () {
  var layout;
  var requestID = parseInt(window.localStorage.getItem('request'));
  for (var i = 0; i < requests.length; i++) {
    if (requests[i].id === requestID) {
      layout = '<h2>' + requests[i].name + '</h2>';
      layout += '<p>' + requests[i].description + '</p>';
      layout += '<form name="requestForm">';
      layout += '<label>Additional comments:<br /><textarea name="comments" ' +
                ' placeholder="Write possible additional comment here..."></textarea></label>';
      layout += '<label>Add files: <small>You can add up to 2 files</small> ' +
                '<br /><input type="file" name="files" multiple="true"' +
                ' onchange="checkFiles();"></input></label>';
      layout += '<a id="submit" class="submit" onclick="submit()">Submit</a>';
      layout += '</form>';

      break;
    }
  }

  return layout;
}

var user;

var getData = function (page) {
  user = JSON.parse(localStorage.getItem('user'));

  document.getElementById('person').innerHTML = '<p>Hello ' + user.name + '</p>';

  switch (page) {
    case 'first':
      document.getElementById('general').innerHTML = getFirst();
      document.getElementById('navbar').innerHTML = getNavbar();
    break;
    case 'requests':
      switch (user.role) {
        case 'student':
          document.getElementById('general').innerHTML = getStudentRequests();
        break;
        default:
          document.getElementById('general').innerHTML = getStudentRequests();
      }
    break;
    case 'request':
      document.getElementById('general').innerHTML = loadRequest();
      break;
    default:
      document.getElementById('general').innerHTML = getFirst();
      document.getElementById('navbar').innerHTML = getNavbar();
  }
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

var loadStudentRequest = function (id) {
  window.localStorage.setItem('request', id);
}

var checkFiles = function () {
  if (document.forms['requestForm']['files'].files.length > 2) {
    alert('Too many files. Please reupload.');
    document.forms['requestForm']['files'].value = '';
  }
}

var submit = function () {
  var requestID = parseInt(window.localStorage.getItem('request'));
  var addComments = document.forms['requestForm']['comments'].value;
  var addFiles = document.forms['requestForm']['files'].files;

  studentRequests.push({
    'idRequest': requestID,
    'idStudent': user.id,
    'comments': addComments,
    'files': addFiles.length ? addFiles : undefined
  });
  window.localStorage.removeItem('request');
  window.location.href = 'requests.html';
}
