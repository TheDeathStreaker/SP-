function getNavbar () {
  var nav = '';
  switch (user.role) {
    case 'professor':
      nav = '<ul>' +
              '<li><a class="strong" href="first.html">Classes</a></li>' +
              '<li><a href="professor/dates.html">Exam dates</a></li>' +
            '</ul>';
    break;
    case 'referat':
      nav = '<ul>' +
              '<li><a href="referat/students.html">Students</a></li>' +
              '<li><a href="referat/professors.html">Professors</a></li>' +
              '<li><a href="referat/classes.html">Classes</a></li>' +
              '<li><a href="referat/requests.html">Requests</a></li>' +
              '<li><a href="referat/orders.html">Orders</a></li>' +
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
      layout += '<h3>Add person</h3>';
      layout += '<form name="addPerson">';
      layout += '<label>';
      layout += 'First name: ';
      layout += '<input name="firstName" type="text" placeholder="First name" required/>';
      layout += '</label><div class="spacer"></div>';
      layout += '<label>';
      layout += 'Last Name: ';
      layout += '<input name="lastName" type="text" placeholder="Last name" required/>';
      layout += '</label><div class="spacer"></div>';
      layout += '<label>';
      layout += 'Role: ';
      layout += '<select name="role">';
      layout += '<option value="student">Student</option>';
      layout += '<option value="professor">Professor</option>';
      layout += '<option value="referat">Referat</option>';
      layout += '</select>';
      layout += '</label><div class="spacer"></div>';
      layout += '<a id="submit" class="submit" onclick="add()">Add</a>';
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
      layout += '</select>';
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

function loadOrders () {
  var layout;

  layout = '<div class="student">';
  layout += '<h4>Physical copy of index</h4>';
  layout += '<form name="indexForm">';
  layout += '<input type="radio" name="language" value="en" checked />English' +
            ' <input type="radio" name="language" value="sl" />Slovene<br />';
  layout += '<a id="submit" class="submit" onclick="order(\'index\')">Order</a>';
  layout += '</form>';
  layout += '</div>';
  layout += '<div class="student">';
  layout += '<h4>Confirmation of signing in</h4>';
  layout += '<form name="confirmationForm">';
  layout += '<label>Amount:<br /><input type="number" name="amount" value="2" min="1" max="10" /></label>';
  layout += '<a id="submit" class="submit" onclick="order(\'confirmation\')">Order</a>';
  layout += '</form>';
  layout += '</div>';

  return layout;
}

function loadIndex () {
  var layout;

  layout = '<div class="student">';
  layout += '<table class="fullWidth">';
  layout += '<tr>';
  layout += '<th width="80%">Class name</th>';
  layout += '<th width="20%">Mark</th>';
  layout += '</tr>';
  layout += '</table>';
  layout += '</div>';

  for (var i = 0; i < user.classes.length; i++) {
    for (var j = 0; j < classes.length; j++) {
      if (user.classes[i].id === classes[j].id) {
        if (user.classes[i].mark) {
          layout += '<div class="student">'
          layout += '<table class="fullWidth">';
          layout += '<tr>';
          layout += '<td width="80%"><h4>' + classes[j].name + '</h4>';
          layout += '</td>';
          layout += '<td width="20%"><p>' + user.classes[i].mark + '</p></td>';
          layout += '</td>';
          layout += '</tr>';
          layout += '</table>';
          layout += '</div>';
        }
      }
    }
  }

  return layout;
}

function loadDates () {
  var layout;

  layout = '<div class="student">';
  layout += '<table class="fullWidth">';
  layout += '<tr>';
  layout += '<th width="80%">Class name</th>';
  layout += '<th width="20%">Dates</th>';
  layout += '</tr>';
  layout += '</table>';
  layout += '</div>';

  for (var i = 0; i < user.classes.length; i++) {
    for (var j = 0; j < classes.length; j++) {
      if (user.classes[i].id === classes[j].id) {
        if (!user.classes[i].mark) {
          layout += '<div class="student">'
          layout += '<table class="fullWidth">';
          layout += '<tr>';
          layout += '<td width="80%"><h4>' + classes[j].name + '</h4>';
          layout += '</td>';
          layout += '<td width="20%">';
          for (var k = 0; k < classes[j].exams.length; k++) {
            layout += '<p>' + classes[j].exams[k] + '</p>';
          }
          layout += '</td>';
          layout += '</td>';
          layout += '</tr>';
          layout += '</table>';
          layout += '</div>';
        }
      }
    }
  }

  return layout;
}

function loadProfDates () {
  var layout;

  layout = '<div class="professor">';
  layout += '<table class="fullWidth">';
  layout += '<tr>';
  layout += '<th width="80%">Class name</th>';
  layout += '<th width="20%">Exam dates</th>';
  layout += '</tr>';
  layout += '</table>';
  layout += '</div>';

  for (var i = 0; i < user.classes.length; i++) {
    for (var j = 0; j < classes.length; j++) {
      if (user.classes[i].id === classes[j].id) {
        layout += '<div class="professor">';
        layout += '<table class="fullWidth">';
        layout += '<tr>';
        layout += '<td width="80%"><h4>' + classes[j].name + '</h4></td>';
        layout += '<td width="20%">';
        for (var k = 0; k < classes[j].exams.length; k++){
          layout += '<p>' + classes[j].exams[k] + '</p>';
        }
        layout += '</td>';
        layout += '</tr>';
        layout += '</table>';
        layout += '</div>';
      }
    }
  }

  return layout;
}

var user;

var getData = function (page) {
  user = JSON.parse(localStorage.getItem('user'));

  document.getElementById('dropdownmenu').innerHTML = 'Hello ' + user.name;

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
          document.getElementById('general').innerHTML = getRefRequests();
      }
    break;
    case 'request':
      document.getElementById('general').innerHTML = loadRequest();
    break;
    case 'dates':
      switch (user.role) {
        case 'student':
          document.getElementById('general').innerHTML = loadDates();
        break;
        default:
          document.getElementById('general').innerHTML = loadProfDates();
      }
    break;
    case 'change':
      document.getElementById('navbar').innerHTML = getNavbar();
    break;
    case 'orders':
      switch (user.role) {
        case 'student':
          document.getElementById('general').innerHTML = loadOrders();
        break;
        default:
          document.getElementById('general').innerHTML = loadOrdersReferat();
      }
    break;
    case 'index':
      document.getElementById('general').innerHTML = loadIndex();
    break;
    default:
      document.getElementById('general').innerHTML = getFirst();
      document.getElementById('navbar').innerHTML = getNavbar();
  }
}

var add = function(what) {
  var firstName, lastName, role;
  if (what === undefined) {
    var firstName = document.forms['addPerson']['firstName'].value;
    var lastName = document.forms['addPerson']['lastName'].value;
    var role = document.forms['addPerson']['role'].value;
  } else {
    role = what;
  }
  switch (role) {
    case 'professor':
      var userID = users.length + 1;

      users.push({
        'id': userID,
        'name': firstName + ' ' + lastName,
        'username': firstName.toLowerCase() + lastName.toLowerCase().substring(0,1),
        'password': lastName.toLowerCase() + '4321',
        'role': role,
        'holding': []
      });

      updateOptions({
        'name': firstName + ' ' + lastName,
        'id': userID,
        'role': role
      });

      document.forms['addPerson']['firstName'].value = '';
      document.forms['addPerson']['lastName'].value = '';
    break;
    case 'student':
    users.push({
      'id': users.length + 1,
      'name': firstName + ' ' + lastName,
      'username': firstName.toLowerCase() + lastName.toLowerCase().substring(0,1),
      'password': firstName.toLowerCase() + '1234',
      'role': role,
      'enrolled': [],
      'requests': [],
      'orders': []
    });

    document.forms['addPerson']['firstName'].value = '';
    document.forms['addPerson']['lastName'].value = '';

    break;
    case 'referat':
      users.push({
        'id': users.length + 1,
        'name': firstName + ' ' + lastName,
        'username': firstName.toLowerCase() + lastName.toLowerCase().substring(0,1),
        'password': firstName.toLowerCase().substring(0,3) + lastName.toLowerCase().substring(0,4) + '12',
        'role': role
      });

      document.forms['addPerson']['firstName'].value = '';
      document.forms['addPerson']['lastName'].value = '';
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

var logout = function () {
  window.localStorage.removeItem('user');

  if (window.location.protocol === 'file:'){
    var regex = new RegExp(/e-Student\/\S+\/\S+\.html/);
    if (regex.test(window.location.href)) {
      window.location.href = '../index.html';
    } else {
      window.location.href = 'index.html';
    }
  } else {
    window.location.href = '/';
  }
}

var changePwd = function () {
  var password1 = document.forms['changePass']['password1'].value;
  var password2 = document.forms['changePass']['password2'].value;

  var error = document.getElementsByClassName('error');

  if (password1 === password2) {
    for (var i = 0; i < users.length; i++) {
      if (user.id === users[i].id) {
        users[i].password = password1;
        error[0].innerHTML = '<p>Password changed successfully.</p>';
        break;
      }
    }
  } else {
    error[0].innerHTML = '<p>Passwords do not match.</p>';
  }

    password1 = document.forms['changePass']['password1'].value = '';
    password1 = document.forms['changePass']['password2'].value = '';
}

var order = function (type) {
  switch (type) {
    case 'index':
      var lang = document.forms['indexForm']['language'].value;
      orders.push({
        'type': type,
        'language': lang,
        'student': user.id
      });
    break;
    default:
      var amount = document.forms['confirmationForm']['amount'].value;
      orders.push({
        'type': type,
        'amount': parseInt(amount),
        'student': user.id
      });
  }
}
