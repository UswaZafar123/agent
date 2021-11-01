export const Side_bar_data = [
    {
        title:"Dashboard",
        path:"/agent/dashboard",
        iconClass:"icon-Asset-47",
        id:1
    },
    {
        title:"Cash Opertaions",
        path:"/agent/cash-operations",
        iconClass:"icon-Asset-47",
        id:1
    },
    {
        title:"Send / Request Money",
        path:"/agent/send-request-money",
        iconClass:"icon-Asset-47",
        id:1,
        subMenu: [
            {
                title: "Send",
                path: "/agent/send/money",
            },
            {
                title: "Request",
                path: "/agent/request/money",
            },

        ]
    },
    {
        title:"Cash in Cash Out",
        path:"/agent/cash-in-cash-out",
        iconClass:"icon-Asset-47",
        id:1
    },
    {
        title:"Pricing List",
        path:"/agent/pricing-list",
        iconClass:"icon-Asset-47",
        id:1
    },
    {
        title:"Customer Registration",
        path:"/admin/agents",
        iconClass:"icon-Asset-2",
        id:2,
        subMenu:[
            {
                title:"Wallet Account Opening",
                path:"/agent/walletAccountOpening",

            },
            {
                title:"Banking Account Opening",
                path:"/agent/BankingAccountOpening",

            },
            // {
            //     title:"Agent Lists",
            //     path:"/admin/agents/all",
            // },
            // {
            //     title:"Agent Payments",
            //     path:"/admin/agents/payments",
            // },
            // {
            //     title:"Agent-Profile First Approval",
            //     path:"/admin/agents/first-approvals",
            // },
            // {
            //     title:"Agent-Profile Second Approval",
            //     path:"/admin/agents/second-approvals",
            // },
        ]
    },
    {
        title:"Banking Operation",
        path:"/admin/banking/transfer",
        id:3,
        iconClass:"icon-Asset-4",
        subMenu:[
            {
                title:"Transfer",
                path:"/admin/banking/transfer",


            },
            {
                title:"Account Balance",
                path:"/admin/banking/account_balance",
            },
            {
                title:"Account Statement",
                path:"/admin/banking/account_statement",
            },
            {
                title:"Cash Deposit In Bank",
                path:"/admin/banking/cash_deposit_bank",
            },
            {
                title:"Cash Withdrawal From Bank",
                path:"/admin/banking/cash_withdrawal_bank",
            },
            {
                title:"Service Payments",
                path:"/admin/banking/service_payments",
            },
        ]
    },
    {
        title:"Wallet Operation",
        path:"/Agent/walletOperation/",
        id:4,
        iconClass:"icon-Asset-3",
        subMenu:[
            {
                title:"Transfert",
                path:"/Agent/walletOperation/transfert", 
            },
            {
                title:"Account Balance",
                path:"/Agent/walletOperation/AccountBalance", 
            },
            {
                title:"Account Statement",
                path:"/Agent/walletOperation/AccountStatement",
            },
            {
                title:"Service Payment",
                path:"/Agent/walletOperation/ServicePayment",
            }
        ]
    },
    {
        title:"Flash Transfer",
        path:"/admin/clients/all",
        id:14,
        iconClass:"icon-Asset-3",
        subMenu:[
            {
                title:"Send Money",
                path:"/Admin/Transfer",
            },
            {
                title:"Recive Money",
                path:"/Admin/Transfer0",
            },
           
        ]
    },
    {
        title:"Transactions",
        path:"/agent/transcations",
        id:5,
        iconClass:"icon-Asset-33"
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
    {
        title:"Revenue Management",
        path:"/admin/user-type/management",
        id:8,
        iconClass:"icon-Asset-29"
    },
    // {
    //     title:"Invoice Management",
    //     path:"/Invoice_Management ",
    //     iconClass:"icon-Asset-28"
    // },
    {
        title:"Ticket Management​",
        path:"/agent/tickets",
        id:9,
        iconClass:"icon-Asset-26"
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
        title:"Access History",
        path:"/agent/access-history",
        id:10,
        iconClass:"icon-Asset-25"
    },
    {
        title:"KYC",
        path:"/agent/kyc",
        id:15,
        iconClass:"icon-Asset-3",
        subMenu:[
            {
                title:"KYC",
                path:"/agent/kyc",
            },
          
           
        ]
    },
    
    {
        title:"Settings",
        path:"/agents/Settings",
        iconClass:"icon-Asset-23",
        id:11,
        subMenu:[
            {
                title:"General",
                path:"/Settings/General",
                subMenu:[
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
                        title:"Package Management",
                        path:"/settings/general/package-management",
                        iconClass:"icon-Asset-4"
                    },
                    {
                        title:"Roles Management",
                        path:"/settings/general/roles-management",
                        iconClass:"icon-Asset-9"
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
                ]
            },
            {
                title:"Agent Member",
                path:"/settings/agent-member",
                iconClass:"icon-Asset-35"
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
                title:"Commissions management",
                path:"/settings/Commissions-management",
            },
            // {
            //     title:"Loyalty Management",
            //     path:"/Settings/Loyalty_Management",
            // },
        ],
    },
    {
        title:"Profile​",
        path:"/User_Profile_Management​",
        id:12,
        iconClass:"icon-Asset-22",
        subMenu:[
            {
                title:"Link to Bank Account",
                path:"/Settings/link/bank-account",
            },
            {
                title:"Link to Agent Banker",
                path:"/Settings/link/agent-banker",
            }
        ]
    },
]