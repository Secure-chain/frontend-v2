import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri'

const SideNavItem = [
  {
    title : 'Dashboard',
    path : '/dashboard',
    iconClosed : <RiIcons.RiArrowDownSFill />,
    iconOpened : <RiIcons.RiArrowUpSFill />,

    subNav : [
      {
        title : 'Profile',
        path : './profile',
        icon : <FaIcons.FaUserCircle/>
      },
      {
        title : 'Owned Supply Chains',
        path : '/dashboard/ownedsupplychains',
        icon : <FaIcons.FaUserCircle/>
      },
      {
        title : 'Enrolled Supply Chains',
        path : '',
        icon : <FaIcons.FaUserCircle/>
      },
      {
        title : 'Participation Request',
        path : '/dashboard/participationrequests',
        icon : <FaIcons.FaUserCircle/>
      }
    ]
  },
  {
    title : 'Supply Chain',
    path : '',
    iconClosed : <RiIcons.RiArrowDownSFill />,
    iconOpened : <RiIcons.RiArrowUpSFill />,

    subNav : [
      {
        title : 'Create Supply Chain',
        path : '/createEntity',
        icon : <FaIcons.FaUserCircle/>
      },
      {
          title : 'Enroll in a Supply Chain',
          path : '/enroll',
          icon : <FaIcons.FaUserCircle/>
      }
    ]
  },
  { 
    title : 'Product',
    path : '',
    iconClosed : <RiIcons.RiArrowDownSFill />,
    iconOpened : <RiIcons.RiArrowUpSFill />,

    subNav : [
      {
        title : 'Create Product',
        path : '',
        icon : <FaIcons.FaUserCircle/>
      },
      {
        title : 'Transfer Product',
        path : '',
        icon : <FaIcons.FaUserCircle/>
      }
    ]
  },
  {
    title : 'Tracking',
    path : '',
    iconClosed : <RiIcons.RiArrowDownSFill />,
    iconOpened : <RiIcons.RiArrowUpSFill />,

    subNav : [
      {
        title : 'Product Tracking',
        path : '/tracking',
        icon : <FaIcons.FaUserCircle/>
      }
    ]
  }
];

export default SideNavItem;