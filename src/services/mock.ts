import {colors} from '@theme';

export const Create_sor = {
  user: {
    name: 'John Doe',
    profile:
      'https://media-exp1.licdn.com/dms/image/C4D03AQG7BnPm02BJ7A/profile-displayphoto-shrink_400_400/0/1597134258301?e=1614211200&v=beta&t=afZdYNgBsJ_CI2bCBxkaHESDbTcOq95eUuLVG7lHHEs',
  },
  Observation: {
    name: 'ABC Systems',
    projects: ['lorem Ipsum', 'Magna', 'aliquip ', 'oluptate'],
    locations: ['kaarchi', 'islamabad', 'lahore'],
    text:
      'Occaecat exercitation sint culpa officia nostrud incididunt amet et @karachi elit ea excepteur nostrud velit.',
    date: 1608751071751,
    suggestions: [
      'Elit veniam qui sit est eu fugiat consectetur.',
      'Elit veniam qui sit est eu fugiat consectetur.',
      'Officia reprehenderit mollit tempor esse.',
      'Ex adipisicing ullamco consequat irure duis.',
    ],
    emailSuggestions: [
      'johndoe@codistan.org',
      'janedoe@codistan.org',
      'janesmith@codistan.org',
    ],
    actionOrRecommended: [
      'Officia laboris incididunt quis id tempor.',
      'Exercitation reprehenderit ea proident nostrud.',
      'Ex voluptate amet ad quis anim ea commodo.',
    ],
    submitTo: ['John Doe', 'Jane Doe', 'zara'],
    esclateTo: ['Lorem', 'Ipsum', 'Officia'],
  },
};

export const mapChart = {
  r1: [
    {value: 5, selected: false, color: colors.riskIcons.yellow},
    {value: 10, selected: false, color: colors.riskIcons.orrange},
    {value: 15, selected: false, color: colors.riskIcons.orrange},
    {value: 20, selected: false, color: colors.riskIcons.red},
    {value: 25, selected: false, color: colors.riskIcons.red},
  ],
  r2: [
    {value: 4, selected: false, color: colors.riskIcons.lightGreen},
    {value: 8, selected: false, color: colors.riskIcons.yellow},
    {value: 12, selected: false, color: colors.riskIcons.orrange},
    {value: 16, selected: false, color: colors.riskIcons.orrange},
    {value: 20, selected: false, color: colors.riskIcons.red},
  ],
  r3: [
    {value: 3, selected: false, color: colors.riskIcons.lightGreen},
    {value: 6, selected: false, color: colors.riskIcons.yellow},
    {value: 9, selected: false, color: colors.riskIcons.yellow},
    {value: 12, selected: false, color: colors.riskIcons.orrange},
    {value: 16, selected: false, color: colors.riskIcons.orrange},
  ],
  r4: [
    {value: 2, selected: false, color: colors.riskIcons.darkGreen},
    {value: 4, selected: false, color: colors.riskIcons.lightGreen},
    {value: 6, selected: false, color: colors.riskIcons.yellow},
    {value: 8, selected: false, color: colors.riskIcons.yellow},
    {value: 10, selected: false, color: colors.riskIcons.orrange},
  ],
  r5: [
    {value: 1, selected: false, color: colors.riskIcons.darkGreen},
    {value: 2, selected: false, color: colors.riskIcons.darkGreen},
    {value: 3, selected: false, color: colors.riskIcons.lightGreen},
    {value: 4, selected: false, color: colors.riskIcons.lightGreen},
    {value: 5, selected: false, color: colors.riskIcons.yellow},
  ],
};

export const View_sor = {
  user: {
    name: 'John Doe',
    profile:
      'https://media-exp1.licdn.com/dms/image/C4D03AQG7BnPm02BJ7A/profile-displayphoto-shrink_400_400/0/1597134258301?e=1614211200&v=beta&t=afZdYNgBsJ_CI2bCBxkaHESDbTcOq95eUuLVG7lHHEs',
    classifyType: 'LSR',
    observation:
      'Aliqua deserunt laboris reprehenderit qui aliqua aute proident amet duis irure.',
    date: 1609667502505,
    InvolvedPersons: [
      {id: 12, name: ' Jane Doe', photo: ''},
      {id: 13, name: ' James Doe', photo: ''},
    ],
    observer: [
      {id: 23, name: 'Jane Doe', photo: ''},
      {id: 24, name: 'Jonna Doe', photo: ''},
    ],
    submittedTo: [
      {id: 45, name: 'Jessica Doe', photo: ''},
      {id: 48, name: 'Ela', photo: ''},
    ],
    EscalatedTo: [
      {id: 65, name: 'Doe', photo: ''},
      {id: 32, name: 'Ela', photo: ''},
    ],

    Risk: 16,
    ActionAndRecommendation: [
      {
        status: 'In Progress',
        observation:
          'Adipisicing voluptate Lorem sint officia fugiat mollit nisi mollit.',
        SubmittedTo: 'Jane Doe',
        AssignedTo: 'Jane Doe',
      },
      {
        status: 'Completed',
        observation:
          'Adipisicing voluptate Lorem sint officia fugiat mollit nisi mollit.',
        SubmittedTo: 'Jane Doe',
        AssignedTo: 'Jane Doe',
      },
    ],
    Attachments: [
      {
        type: 'photo',
        url:
          'https://media-exp1.licdn.com/dms/image/C4D03AQG7BnPm02BJ7A/profile-displayphoto-shrink_400_400/0/1597134258301?e=1614211200&v=beta&t=afZdYNgBsJ_CI2bCBxkaHESDbTcOq95eUuLVG7lHHEs',
      },
      {
        type: 'file',
        url:
          'https://github.com/facebook/flux/files/5763886/The_Ultimate_Guide_to_React_Native_Optimization_Ebook-Callstack.pdf',
      },
    ],
  },
};
export const viewas = ['Board View', 'List View'];

export const all_sor = [
  {
    date: 1609361909947,
    observation:
      'Deserunt labore culpa aliqua excepteur sunt officia fugiat magna sint non nisi nulla aliquip.',
    risk: 16,
    classify: 'Concern',
    type: 'Drafts',
    location: 'lorem Ipsum',
  },
  {
    date: 1609361909947,
    observation:
      'Deserunt labore culpa aliqua excepteur sunt officia fugiat magna sint non nisi nulla aliquip.',
    risk: 16,
    classify: 'Concern',
    type: 'Drafts',
    location: 'lorem Ipsum',
  },
  {
    date: 1609361909947,
    observation:
      'Deserunt labore culpa aliqua excepteur sunt officia fugiat magna sint non nisi nulla aliquip.',
    risk: 16,
    classify: 'Concern',
    type: 'Drafts',
    location: 'lorem Ipsum',
  },
  {
    date: 1609361909947,
    observation:
      'Deserunt labore culpa aliqua excepteur sunt officia fugiat magna sint non nisi nulla aliquip.',
    risk: 16,
    classify: 'Concern',
    type: 'Drafts',
    location: 'lorem Ipsum',
  },
  {
    date: 1609361909947,
    observation:
      'Deserunt labore culpa aliqua excepteur sunt officia fugiat magna sint non nisi nulla aliquip.',
    risk: 16,
    classify: 'Concern',
    type: 'Drafts',
    location: 'lorem Ipsum',
  },
  {
    date: 1609361909947,
    observation:
      'Deserunt labore culpa aliqua excepteur sunt officia fugiat magna sint non nisi nulla aliquip.',
    risk: 16,
    classify: 'Concern',
    type: 'Drafts',
    location: 'lorem Ipsum',
  },
  {
    date: 1609361909947,
    observation:
      'Deserunt labore culpa aliqua excepteur sunt officia fugiat magna sint non nisi nulla aliquip.',
    risk: 16,
    classify: 'Concern',
    type: 'Drafts',
    location: 'lorem Ipsum',
  },
  {
    date: 1609361909947,
    observation:
      'Deserunt labore culpa aliqua excepteur sunt officia fugiat magna sint non nisi nulla aliquip.',
    risk: 16,
    classify: 'Concern',
    type: 'Drafts',
    location: 'lorem Ipsum',
  },
  {
    date: 1609361909947,
    observation:
      'Deserunt labore culpa aliqua excepteur sunt officia fugiat magna sint non nisi nulla aliquip.',
    risk: 16,
    classify: 'Concern',
    type: 'Drafts',
    location: 'lorem Ipsum',
  },
  {
    date: 1609361909947,
    observation:
      'Deserunt labore culpa aliqua excepteur sunt officia fugiat magna sint non nisi nulla aliquip.',
    risk: 16,
    classify: 'Concern',
    type: 'Drafts',
    location: 'lorem Ipsum',
  },
];

// export const popular
