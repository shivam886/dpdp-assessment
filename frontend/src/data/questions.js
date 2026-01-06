export const SECTIONS = [
    {
        id: 'data-flow-assessment',
        title: 'Data Flow Assessment',
        description: 'Map out the lifecycle of personal data within your organization.',
        questions: [
            {
                id: 'data_types',
                text: 'What types of personal data are handled?',
                type: 'multiselect',
                options: [
                    'Identity details',
                    'Contact information',
                    'Financial data',
                    'Government IDs',
                    'Employee data',
                    'Customer data',
                    'Vendor/contractor data',
                    'System/access logs',
                    'Usage/analytics data'
                ],
                required: true,
            },
            {
                id: 'data_subjects',
                text: 'Whose data is processed?',
                type: 'multiselect',
                options: [
                    'Employees',
                    'Contractual staff',
                    'Customers',
                    'Vendors/partners',
                    'Applicants',
                    'Management/directors'
                ],
                required: true,
            },
            {
                id: 'collection_source',
                text: 'From where is the data collected?',
                type: 'multiselect',
                options: [
                    'Internal applications/portals',
                    'ERP/CRM systems',
                    'Email',
                    'Physical forms',
                    'Third-party systems',
                    'Automated logs/integrations'
                ],
                required: true,
            },
            {
                id: 'processing_purpose',
                text: 'What is the purpose of processing this data?',
                type: 'multiselect',
                options: [
                    'Operational processing',
                    'Legal/statutory compliance',
                    'Payments/billing',
                    'Analytics/reporting',
                    'Customer service',
                    'Decision-making'
                ],
                required: true,
            },
            {
                id: 'storage_location',
                text: 'Where is the data stored or processed?',
                type: 'multiselect',
                options: [
                    'ERP/business systems',
                    'Departmental tools',
                    'Cloud platforms',
                    'Databases/data warehouse',
                    'Email systems',
                    'Physical storage'
                ],
                required: true,
            },
            {
                id: 'internal_sharing',
                text: 'Is data shared internally? If yes, with whom?',
                type: 'multiselect',
                options: [
                    'HR',
                    'Finance',
                    'IT',
                    'Legal',
                    'Management',
                    'Audit/Compliance',
                    'Not shared internally'
                ],
                required: true,
            },
            {
                id: 'external_sharing',
                text: 'Is data shared externally? If yes, with whom?',
                type: 'multiselect',
                options: [
                    'Vendors/service providers',
                    'Partners',
                    'Auditors',
                    'Regulators',
                    'Cloud service providers',
                    'Not shared externally'
                ],
                required: true,
            },
            {
                id: 'data_residency',
                text: 'Is data accessed or stored outside India?',
                type: 'radio',
                options: [
                    'Yes',
                    'No',
                    'Not Sure'
                ],
                required: true,
            },
            {
                id: 'access_control',
                text: 'Who can access this data?',
                type: 'multiselect',
                options: [
                    'Department users',
                    'Restricted authorised users',
                    'IT administrators',
                    'Senior management',
                    'Third-party users'
                ],
                required: true,
            },
            {
                id: 'retention_approach',
                text: 'What is the data retention approach?',
                type: 'radio',
                options: [
                    'Defined internal policy',
                    'Statutory requirement',
                    'Contract-based',
                    'Not defined'
                ],
                required: true,
            },
            {
                id: 'post_retention',
                text: 'What happens after the retention period ends?',
                type: 'radio',
                options: [
                    'Secure deletion',
                    'Restricted archival',
                    'Manual deletion',
                    'No defined process'
                ],
                required: true,
            },
            {
                id: 'data_ownership',
                text: 'Who owns this data or processing activity?',
                type: 'radio',
                options: [
                    'Department head',
                    'Process owner',
                    'Legal/Compliance',
                    'Shared ownership',
                    'Not defined'
                ],
                required: true,
            }
        ]
    }
];
