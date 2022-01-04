export const Side_bar_data = [
  {
    title: "Dashboard",
    path: "/agent/dashboard",
    iconClass: "icon-Asset-47",
    id: 1,
  },
  // {
  //   title: "Cash Deposit",
  //   path: "/agent/cash_deposit/wallet",
  //   iconClass: "icon-Asset-47",
  //   id: 2,
  //   subMenu: [

  //   ],
  // },
  // {
  //   title: "Cash Withdraw",
  //   path: "/agent/cash_withdraw/wallet",
  //   iconClass: "icon-Asset-47",
  //   id: 3,
  //   subMenu: [


  //   ],
  // },
  {
    title: "Cash In/Cash Out",
    path: "/agent/cash_in",
    iconClass: "icon-Asset-47",
    id: 4,
    subMenu: [
      {
        title: "Cash In",
        path: "/agent/cash_in",
      },
      {
        title: "Cash out",
        path: "/agent/cash_out",
      },
    ],
  },
  {
    title: "Send / Request Money",
    path: "/agent/send-request-money",
    iconClass: "icon-Asset-47",
    id: 21,
    subMenu: [
      {
        title: "Cash In",
        path: "/agent/cash_in",
      },
      {
        title: "Cash out",
        path: "/agent/cash_out",
      },
    ],
  },
  {
    title: "Send Money",
    path: "/agent/sendmoney",
    iconClass: "icon-Asset-47",
    id: 5,
    subMenu: [
      {
        title: "To Agent Wallet",
        path: "/agent/send-money",
      },
      {
        title: "To Agent Member",
        path: "/agent/send-money-agentMember",
      },
    ],
  },
  {
    title: "Account Opening",
    path: "/admin/agents",
    iconClass: "icon-Asset-2",
    id: 8,
    subMenu: [
      {
        title: "Wallet Account Opening",
        path: "/agent/walletAccountOpening",
      },
      {
        title: "Banking Account Opening",
        path: "/agent/BankingAccountOpening",
      },
    ],
  },
  {
    title: "Banking Operation",
    path: "/admin/banking/transfer",
    id: 9,
    iconClass: "icon-Asset-4",
    subMenu: [
      {
        title: "Transfer",
        path: "/admin/banking/transfer",
      },
      {
        title: "Cash Deposit To Bank",
        path: "/agent/cash_deposit/bank",
      },
      {
        title: "Cash Withdraw From Bank",
        path: "/agent/cash_withdraw/bank",
      },
      {
        title: "Account Balance",
        path: "/admin/banking/account_balance",
      },
      {
        title: "Account Statement",
        path: "/admin/banking/account_statement",
      },
      {
        title: "Cash Deposit In Bank",
        path: "/admin/banking/cash_deposit_bank",
      },
      {
        title: "Cash Withdrawal From Bank",
        path: "/admin/banking/cash_withdrawal_bank",
      },
      {
        title: "Service Payments",
        path: "/admin/banking/service_payments",
      },
    ],
  },
  {
    title: "Wallet Operation",
    path: "/Agent/walletOperation/",
    id: 10,
    iconClass: "icon-Asset-3",
    subMenu: [
      {
        title: "Transfert",
        path: "/Agent/walletOperation/transfert",
      },
      {
        title: "Cash Deposit To Wallet",
        path: "/agent/cash_deposit/wallet",
      },
      {
        title: "Cash Withdraw From Wallet",
        path: "/agent/cash_withdraw/wallet",
      },
      {
        title: "Account Balance",
        path: "/Agent/walletOperation/AccountBalance",
      },
      {
        title: "Account Statement",
        path: "/Agent/walletOperation/AccountStatement",
      },
      {
        title: "Service Payment",
        path: "/Agent/walletOperation/ServicePayment",
      },
    ],
  },
  // {
  //   title: "Flash Transfer",
  //   path: "/admin/clients/all",
  //   id: 11,
  //   iconClass: "icon-Asset-3",
  //   subMenu: [
  //     {
  //       title: "Send Money",
  //       path: "/Admin/Transfer",
  //     },
  //     {
  //       title: "Recive Money",
  //       path: "/Admin/Transfer0",
  //     },
  //   ],
  // },

  // {
  //   title: "Assets & Operations",
  //   path: "/agent/assets",
  //   id: 12,
  //   iconClass: "icon-Asset-3",
  //   subMenu: [
  //     {
  //       title: "Assets",
  //       path: "/agent/assets",
  //     },
  //     {
  //       title: "Operations",
  //       path: "/agent/opeartions",
  //     },
  //   ],
  // },
  {
    title: "Transactions",
    path: "/agent/transcations",
    id: 13,
    iconClass: "icon-Asset-33",
  },
  // {
  //     title:"Assets Management",
  //     path:"/Assets_Management",
  //     iconClass:"icon-Asset-32"
  // },
  // {
  //     title:"Settlements",
  //     path:"/admin/Currency_Management",
  //     id:6,
  //     iconClass:"icon-Asset-31"
  // },
  // {
  //     title:"Settlements",
  //     path:"/Settlements",
  //     iconClass:"icon-Asset-30"
  // },
  // {
  //     title:"Loan Applications",
  //     path:"/admin/revenue/management",
  //     id:7,
  //     iconClass:"icon-Asset-29",
  //     subMenu:[

  //         {
  //             title:"Loan Application ",
  //             path:"/Admin/Loan",
  //         },

  //     ]
  // },
  // {
  //   title: "Revenue Management",
  //   path: "/admin/user-type/management",
  //   id: 14,
  //   iconClass: "icon-Asset-29",
  // },
  // {
  //     title:"Invoice Management",
  //     path:"/Invoice_Management ",
  //     iconClass:"icon-Asset-28"
  // },
  {
    title: "Ticket Management",
    path: "/agent/tickets",
    id: 16,
    iconClass: "icon-Asset-26",
  },
  // {
  //     title:"Tontine Management​​",
  //     path:"/Tontine_Management​",
  //     iconClass:"icon-Asset-27"
  // },
  // {
  //     title:"Analytics",
  //     path:"/Analytics",
  //     iconClass:"icon-Asset-29"
  // },
  {
    title: "Access History",
    path: "/agent/access-history",
    id: 17,
    iconClass: "icon-Asset-25",
  },
  {
    title: "KYC",
    path: "/agent/kyc",
    id: 18,
    iconClass: "icon-Asset-3",
    subMenu: [
      {
        title: "KYC",
        path: "/agent/kyc",
      },
    ],
  },

  {
    title: "Settings",
    path: "/agents/Settings",
    iconClass: "icon-Asset-23",
    id: 19,
    subMenu: [
      {
        title: "General",
        path: "/Settings/General",
        subMenu: [
          // {
          //     title:"Agent Packages",
          //     path:"/admin/settings/general",
          //     iconClass:"icon-Asset-2"
          // },
          // {
          //     title:"Crypto Curriences Settings",
          //     path:"/admin/settings/general/manage/crypto-currencies",
          //     iconClass:"icon-Asset-3"
          // },
          // {
          //     title:"Social Links",
          //     path:"/admin/settings/general/manage/social-links",
          //     iconClass:"icon-Asset-9"
          // },
          // {
          //     title:"Google reCaptcha",
          //     path:"/admin/settings/general/manage/re-captcha",
          //     iconClass:"icon-Asset-9"
          // },
          // {
          //     title:"App Store Credentials",
          //     path:"/admin/settings/general/playstore",
          //     iconClass:"icon-Asset-15"
          // },
          // {
          //     title:"Email Settings",
          //     path:"/admin/settings/general/email-settings",
          //     iconClass:"icon-Asset-18"
          // },
          // {
          //     title:"SMS Settings",
          //     path:"/admin/settings/general/sms-settings",
          //     iconClass:"icon-Asset-15"
          // },
          // {
          //     title:"Notification Settings",
          //     path:"/Merchant-Pending_Second_Approval/Merchant-Pending_Second_Approval",
          //     iconClass:"icon-Asset-14"
          // },
          // {
          //     title:"Countries",
          //     path:"/admin/settings/general/countries",
          //     iconClass:"icon-Asset-7"
          // },
          // {
          //     title:"Languages",
          //     path:"/admin/settings/general/manage/languages",
          //     iconClass:"icon-Asset-11"
          // },
          {
            title: "Agent Users",
            path: "/settings/general/users",
            iconClass: "icon-Asset-2",
          },
          {
            title: "Package Management",
            path: "/settings/general/package-management",
            iconClass: "icon-Asset-4",
          },
          {
            title: "Roles Management",
            path: "/settings/general/roles-management",
            iconClass: "icon-Asset-9",
          },
          // {
          //     title:"Roles & Permissions",
          //     path:"/admin/settings/general/manage/roles",
          //     iconClass:"icon-Asset-9"
          // },
          // {
          //     title:"Datebase Backup",
          //     path:"/admin/settings/general/manage/databases",
          //     iconClass:"icon-Asset-6"
          // },
          // {
          //     title:"Metas",
          //     path:"/admin/Merchant-Pending_Second_Approval/Merchant-Pending_Second_Approval",
          //     iconClass:"icon-Asset-8"
          // },
          // {
          //     title:"Pages",
          //     path:"/admin/settings/general/pages",
          //     iconClass:"icon-Asset-5"
          // },
          // {
          //     title:"Preferences",
          //     path:"/admin/settings/general/manage/preference",
          //     iconClass:"icon-Asset-17"
          // },
        ],
      },
      {
        title: "Agent Member",
        path: "/settings/agent-member",
        iconClass: "icon-Asset-35",
      },
      // {
      //     title:"Limit Type Management",
      //     path:"/admin/settings/limit-type",

      // },
      // {
      //     title:"Fees Management",
      //     path:"/admin/settings/fees",
      // },
      // {
      //     title:"Payment Categories",
      //     path:"/admin/payment-categories",
      // },
      // {
      //     title:"Payment Methods",
      //     path:"/admin/payment-methods",
      // },

      // {
      //     title:"Liquidity Management",
      //     path:"/Settings/Liquidity_Management",
      // },
      // {
      //     title:"Event Management",
      //     path:"/Settings/Event_Management",
      // },
      // {
      //     title:"Electronic ticket Management",
      //     path:"/Settings/Electronic_ticket_Management",
      // },
      // {
      //     title:"Online Fraud Risk Management",
      //     path:"/Settings/Online_Fraud_Risk_Management",
      // },
      // {
      //     title:"Loan Management ",
      //     path:"/Settings/Loan_Management",
      // },
      {
        title: "Commissions management",
        path: "/settings/Commissions-management",
      },
      {
        title: "Assets",
        path: "/agent/assets",
      },
      {
        title: "Operations",
        path: "/agent/operations",
      },
      // {
      //     title:"Loyalty Management",
      //     path:"/Settings/Loyalty_Management",
      // },
    ],
  },
  {
    title: "Profile",
    path: "/Profile/Profile",
    id: 20,
    iconClass: "icon-Asset-22",
    subMenu: [
      {
        title: "Profile",
        path: "/Profile/Profile",
      },
      // {
      //   title: "Accounts",
      //   path: "/Profile/Accounts",
      // },
      // {
      //   title: "QR Code",
      //   path: "/Profile/qr-code",
      // },
      {
        title: "Change Password",
        path: "/Profile/change-password",
      },
      {
        title: "Account Linking",
        path: "/profile/account/link",
      },
      {
        title: "validate Bank Id",
        path: "/profile/account/validate_id",
      },
    ],
  },
];
