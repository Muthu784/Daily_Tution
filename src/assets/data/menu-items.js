import { USER_TYPES } from '@/types/auth';

// Admin Menu Items
export const ADMIN_MENU_ITEMS = [
  {
    key: 'overview',
    label: 'Overview',
    icon: 'tabler:dashboard',
    url: '/admin/overview'
  },
  {
    key: 'user-management',
    label: 'User Management',
    icon: 'tabler:users',
    url: '/admin/user-management'
  },
  {
    key: 'billing',
    label: 'Billing & Payments',
    icon: 'tabler:credit-card',
    url: '/admin/billing'
  },
  {
    key: 'reports',
    label: 'Reports',
    icon: 'tabler:report',
    url: '/admin/reports'
  },
  {
    key: 'support',
    label: 'Support',
    icon: 'tabler:help',
    url: '/admin/support'
  },
  {
    key: 'ai-tools',
    label: 'AI Tools',
    icon: 'tabler:robot',
    url: '/admin/ai-tools'
  },
  // {
  //   key: 'troubleshoot',
  //   label: 'Troubleshoot',
  //   icon: 'tabler:tool',
  //   url: '/admin/troubleshoot'
  // }
];

// Teacher Menu Items
export const TEACHER_MENU_ITEMS = [
  {
    key: 'schedule',
    label: "Today's Schedule",
    icon: 'tabler:calendar',
    url: '/teacher/schedule'
  },
  {
    key: 'homework',
    label: 'Homework Manager',
    icon: 'tabler:book',
    url: '/teacher/homework'
  },
  {
    key: 'insights',
    label: 'Student Insights',
    icon: 'tabler:chart-bar',
    url: '/teacher/insights'
  },
  {
    key: 'live-classes',
    label: 'Live Class Hub',
    icon: 'tabler:video',
    url: '/teacher/live-classes'
  },
  {
    key: 'parent-communication',
    label: 'Parent Communication',
    icon: 'tabler:message',
    url: '/teacher/parent-communication'
  },
  {
    key: 'resources',
    label: 'Resources',
    icon: 'tabler:book-2',
    url: '/teacher/resources'
  },
  {
    key: 'troubleshoot',
    label: 'Troubleshoot',
    icon: 'tabler:tool',
    url: '/teacher/troubleshoot'
  }
];

// Student Menu Items
export const STUDENT_MENU_ITEMS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'tabler:dashboard',
    url: '/student/dashboard'
  },
  {
    key: 'live-classes',
    label: 'Live Classes',
    icon: 'tabler:video',
    url: '/student/live-classes'
  },
  {
    key: 'attendance',
    label: 'My Attendance',
    icon: 'tabler:checklist',
    url: '/student/attendance'
  },
  {
    key: 'mock-tests',
    label: 'Mock Tests',
    icon: 'tabler:clipboard-check',
    url: '/student/mock-tests'
  },
  {
    key: 'rewards',
    label: 'Rewards',
    icon: 'tabler:award',
    url: '/student/rewards'
  },
  {
    key: 'ask-doubt',
    label: 'Ask a Doubt',
    icon: 'tabler:help',
    url: '/student/ask-doubt'
  },
  {
    key: 'troubleshoot',
    label: 'Troubleshoot',
    icon: 'tabler:tool',
    url: '/student/troubleshoot'
  }
];

// Parent Menu Items
export const PARENT_MENU_ITEMS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'tabler:dashboard',
    url: '/parent/dashboard'
  },
  {
    key: 'performance',
    label: 'Performance Report',
    icon: 'tabler:chart-bar',
    url: '/parent/performance'
  },
  {
    key: 'attendance',
    label: 'Attendance Tracker',
    icon: 'tabler:checklist',
    url: '/parent/attendance'
  },
  {
    key: 'chat',
    label: 'Parent-Teacher connect',
    icon: 'tabler:message',
    url: '/parent/connect'
  },
  {
    key: 'payments',
    label: 'Payment & Fees',
    icon: 'tabler:credit-card',
    url: '/parent/payments'
  },
  {
    key: 'resources',
    label: 'Resources',
    icon: 'tabler:book-2',
    url: '/parent/resources'
  },
  {
    key: 'troubleshoot',
    label: 'Troubleshoot',
    icon: 'tabler:tool',
    url: '/parent/troubleshoot'
  }
];

// Function to get menu items based on user type
export const getMenuItemsByUserType = (userType) => {
  switch (userType) {
    case USER_TYPES.ADMIN:
      return ADMIN_MENU_ITEMS;
    case USER_TYPES.TEACHER:
      return TEACHER_MENU_ITEMS;
    case USER_TYPES.STUDENT:
      return STUDENT_MENU_ITEMS;
    case USER_TYPES.PARENT:
      return PARENT_MENU_ITEMS;
    default:
      return [];
  }
};

// Export empty arrays for horizontal menu items
export const HORIZONTAL_MENU_ITEM = [];
export const MENU_ITEMS = [];