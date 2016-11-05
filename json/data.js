var users = [
  {
    'id': 1,
    'username': 'adrianj',
    'name': 'Adrian Jarc',
    'password': 'adrian1234',
    'role': 'student',
    'enrolled': [
      {
        'id': 1,
        'mark': 6
      },
      {
        'id': 2
      }
    ],
    'requests': [],
    'orders': []
  },
  {
    'id': 2,
    'username': 'janezn',
    'name': 'Janez Novak',
    'password': 'novak4321',
    'role': 'professor',
    'holding': [
      {
        'id': 1
      },
      {
        'id': 2
      }
    ]
  },
  {
    'id': 3,
    'username': 'metak',
    'name': 'Meta Križman',
    'password': 'metkriz12',
    'role': 'referat'
  }
];

var classes = [
  {
    'id': 1,
    'name': 'Spletno programiranje',
    'exams':[
      '12.2.2017 10.00',
      '26.2.2017 10.00'
    ],
    'enrolled': [
      {
        'id': 1
      }
    ]
  },
  {
    'id': 2,
    'name': 'Something',
    'exams': [
      '14.2.2017 10.00'
    ],
    'enrolled': [
      {
        'id': 1
      }
    ]
  }
];

var requests = [];

var orders = [];
