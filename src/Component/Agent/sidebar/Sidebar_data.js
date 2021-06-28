export const Side_bar_data = [
    {
        title:"Dashboard",
        path:"/agent/dashboard",
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
                title:"Agent Lists",
                path:"/admin/agents/all",
            },
            {
                title:"Agent Payments",
                path:"/admin/agents/payments",
            },
            {
                title:"Agent-Profile First Approval",
                path:"/admin/agents/first-approvals",
            },
            {
                title:"Agent-Profile Second Approval",
                path:"/admin/agents/second-approvals",
            },
        ]
    },
    {
        title:"Bank Operation",
        path:"/admin/merchants/all",
        id:3,
        iconClass:"icon-Asset-4",
        subMenu:[
            {
                title:"Merchant Lists",
                path:"/admin/merchants/all",
            },
            {
                title:"Merchant Payments",
                path:"/admin/merchants/Merchant_Payments",
            },
            {
                title:"Merchant-Pending First Approval",
                path:"/admin/merchants/pending-first-approval",
            },
            {
                title:"Merchant-Pending_Second Approval",
                path:"/admin/merchants/pending-second-approval",
            },
        ]
    },
    {
        title:"Wallet Operation",
        path:"/admin/clients/all",
        id:4,
        iconClass:"icon-Asset-3",
        subMenu:[
            {
                title:"Client Lists",
                path:"/admin/clients/all",
            },
            {
                title:"Client Pending First Approval",
                path:"/admin/clients/first-approvals",
            },
            {
                title:"Client Pending Second Approval",
                path:"/admin/clients/second-approvals",
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
                title:"Client Lists",
                path:"/admin/clients/all",
            },
            {
                title:"Client Pending First Approval",
                path:"/admin/clients/first-approvals",
            },
            {
                title:"Client Pending Second Approval",
                path:"/admin/clients/second-approvals",
            }
        ]
    },
    {
        title:"Transcation",
        path:"/agent/transcations",
        id:5,
        iconClass:"icon-Asset-33"
    },
    // {
    //     title:"Assets Management",
    //     path:"/Assets_Management",
    //     iconClass:"icon-Asset-32"
    // },
    {
        title:"Settlements",
        path:"/admin/Currency_Management",
        id:6,
        iconClass:"icon-Asset-31"
    },
    // {
    //     title:"Settlements",
    //     path:"/Settlements",
    //     iconClass:"icon-Asset-30"
    // },
    {
        title:"Loan Applications",
        path:"/admin/revenue/management",
        id:7,
        iconClass:"icon-Asset-29"
    },
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
        title:"Settings",
        path:"/admin/Settings",
        iconClass:"icon-Asset-23",
        id:11,
        subMenu:[
            {
                title:"General",
                path:"/Settings/General",
                subMenu:[
                    {
                        title:"Agent Packages",
                        path:"/admin/settings/general",
                        iconClass:"icon-Asset-2"
                    },
                    {
                        title:"Crypto Curriences Settings",
                        path:"/admin/settings/general/manage/crypto-currencies",
                        iconClass:"icon-Asset-3"
                    },
                    {
                        title:"Social Links",
                        path:"/admin/settings/general/manage/social-links",
                        iconClass:"icon-Asset-9"
                    },
                    {
                        title:"Google reCaptcha",
                        path:"/admin/settings/general/manage/re-captcha",
                        iconClass:"icon-Asset-9"
                    },
                    {
                        title:"App Store Credentials",
                        path:"/admin/settings/general/playstore",
                        iconClass:"icon-Asset-15"
                    },
                    {
                        title:"Email Settings",
                        path:"/admin/settings/general/email-settings",
                        iconClass:"icon-Asset-18"
                    },
                    {
                        title:"SMS Settings",
                        path:"/admin/settings/general/sms-settings",
                        iconClass:"icon-Asset-15"
                    },
                    {
                        title:"Notification Settings",
                        path:"/Merchant-Pending_Second_Approval/Merchant-Pending_Second_Approval",
                        iconClass:"icon-Asset-14"
                    },
                    {
                        title:"Countries",
                        path:"/admin/settings/general/countries",
                        iconClass:"icon-Asset-7"
                    },
                    {
                        title:"Languages",
                        path:"/admin/settings/general/manage/languages",
                        iconClass:"icon-Asset-11"
                    },
                    {
                        title:"Merchant Packages",
                        path:"/admin/settings/general/merchant-packages",
                        iconClass:"icon-Asset-35"
                    },
                    {
                        title:"User Groups",
                        path:"/admin/settings/general/manage/user-group",
                        iconClass:"icon-Asset-19"
                    },
                    {
                        title:"Roles & Permissions",
                        path:"/admin/settings/general/manage/roles",
                        iconClass:"icon-Asset-9"
                    },
                    {
                        title:"Datebase Backup",
                        path:"/admin/settings/general/manage/databases",
                        iconClass:"icon-Asset-6"
                    },
                    {
                        title:"Metas",
                        path:"/admin/Merchant-Pending_Second_Approval/Merchant-Pending_Second_Approval",
                        iconClass:"icon-Asset-8"
                    },
                    {
                        title:"Pages",
                        path:"/admin/settings/general/pages",
                        iconClass:"icon-Asset-5"
                    },
                    {
                        title:"Preferences",
                        path:"/admin/settings/general/manage/preference",
                        iconClass:"icon-Asset-17"
                    },
                ]
            },
            {
                title:"Limit Type Management",
                path:"/admin/settings/limit-type",
                
            },
            {
                title:"Fees Management",
                path:"/admin/settings/fees",
            },
            {
                title:"Payment Categories",
                path:"/admin/payment-categories",
            },
            {
                title:"Payment Methods",
                path:"/admin/payment-methods",
            },
            
            {
                title:"Liquidity Management",
                path:"/Settings/Liquidity_Management",
            },
            {
                title:"Event Management",
                path:"/Settings/Event_Management",
            },
            {
                title:"Electronic ticket Management",
                path:"/Settings/Electronic_ticket_Management",
            },
            {
                title:"Online Fraud Risk Management",
                path:"/Settings/Online_Fraud_Risk_Management",
            },
            {
                title:"Loan Management ",
                path:"/Settings/Loan_Management",
            },
            {
                title:"Commissions management",
                path:"/Settings/Commissions_management",
            },
            {
                title:"Loyalty Management",
                path:"/Settings/Loyalty_Management",
            },
        ]
    },
    {
        title:"Account Management​",
        path:"/User_Profile_Management​",
        id:12,
        iconClass:"icon-Asset-22"
    },
]