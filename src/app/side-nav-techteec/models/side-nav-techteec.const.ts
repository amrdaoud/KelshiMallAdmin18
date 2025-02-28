import { USERS_ICON, ENVELOP_ICON, SEND_ICON, POST_ICON, LIST_ICON, REPORT_ICON, CATEGORY_ICON, TRANSACTIONS_ICON, QR_ICON, ADMIN_ICON, SYSTEM_USER_ICON, BANNER_ICON, ANDROID_ICON, LOG_ICON, DELIVERY_ICON, ORDER_ICON, QUIZ_ICON } from "../../../app-icons";
import { IconNavItemWithRoles } from "./side-nav-techteec";

export const items: IconNavItemWithRoles[] = [

    {
      title: 'Users',
      svgIcon: USERS_ICON,
      postition: 'top',
      roles: ['User Manager', 'Super User'],
      children: [
        {
            title: 'Users List',
            svgIcon: LIST_ICON,
            postition: 'top',
            routerLink: 'user-manager',
            roles: ['User Manager', 'Super User'],
        },
        {
            title: 'Messages',
            svgIcon: ENVELOP_ICON,
            routerLink: 'contact-messages',
            roles: ['User Manager', 'Super User']
        },
        {
            title: 'Notifications',
            svgIcon: SEND_ICON,
            routerLink: 'notification-types',
            roles: ['Super User', 'Notification Manager']
        }
      ]
    },
    {
        title: 'Posts',
        svgIcon: POST_ICON,
        roles: ['Post Manager', 'Super User', 'User Manager'],
        children: [
            {
                title: 'Posts List',
                svgIcon: LIST_ICON,
                routerLink: 'posts',
                roles: ['Post Manager', 'Super User']
            },
            {
                title: 'Categories',
                svgIcon: CATEGORY_ICON,
                routerLink: 'categories',
                roles: ['User Manager', 'Super User', 'Post Manager']
            },
            {
                title: 'Post Reports',
                svgIcon: REPORT_ICON,
                routerLink: 'post-reports',
                roles: ['Post Manager', 'Super User', 'User Manager']
            },
        ],
    },
    {
        title: 'Transactions',
        svgIcon: TRANSACTIONS_ICON,
        roles: ['Super User', 'Account Manager'],
        children :[
            {
                title: 'Transactions List',
                svgIcon: LIST_ICON,
                routerLink: 'transactions',
                roles: ['Super User', 'Account Manager'],
            },
            {
                title: 'Redeem Codes',
                svgIcon: QR_ICON,
                routerLink: 'redeems',
                roles: ['Super User', 'Account Manager']
            },
        ]
    },
    {
        title: 'Delivery System',
        svgIcon: DELIVERY_ICON,
        roles: ['Super User', 'Delivery Manager', 'Delivery Provider'],
        children: [
            {
                title: 'Delivery Providers',
                svgIcon: LIST_ICON,
                routerLink: 'delivery-providers',
                roles: ['Super User', 'Delivery Manager', 'Delivery Provider']
            },
            {
                title: 'Orders',
                svgIcon: ORDER_ICON,
                routerLink: 'orders',
                roles: ['Super User', 'Delivery Manager']
            },
        ]
    },
    {
        title: "Quizzes",
        svgIcon: QUIZ_ICON,
        roles: ['Super User', 'Quiz Manager'],
        children: [
            {
                title: 'Quizzes',
                svgIcon: LIST_ICON,
                routerLink: 'quizzes/list',
                roles: ['Super User', 'Quiz Manager']
            },
            {
                title: 'Participants',
                svgIcon: USERS_ICON,
                routerLink: 'quizzes/participants',
                roles: ['Super User', 'Quiz Manager']
            }
        ]
    },
    {
        title: 'Admin Tools',
        svgIcon: ADMIN_ICON,
        postition: 'bottom',
        roles: ['Super User', 'Application Developer'],
        children: [
            {
                title: 'System Users',
                svgIcon: SYSTEM_USER_ICON,
                routerLink: 'system-user-manager',
                roles: ['Super User']
            },
            {
                title: 'Banners',
                svgIcon: BANNER_ICON,
                routerLink: 'banners',
                roles: ['Super User']
            },
            {
                title: 'Upload App',
                svgIcon: ANDROID_ICON,
                routerLink: 'upload-app',
                roles: ['Super User']
            },
            {
                title: 'Application Log',
                svgIcon: LOG_ICON,
                routerLink: 'app-log',
                roles: ['Super User', 'Application Developer']
            },
        ]
    }
  ];
