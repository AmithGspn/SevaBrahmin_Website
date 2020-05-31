module.exports = {
    database: {
        // Database credentials for the course.
        default: {
            name: 'SevaBrahmin',
            host: 'localhost',
            port: '27017',
            user: null,
            password: null,
        },
        test: {
            name: 'SevaBrahmin_test',
            host: 'localhost',
            port: '27017',
            user: null,
            password: null,
        }

    },
    collections: {
        volunteers: 'volunteers',
        recipients: 'recipients',
        users: 'users'
    },
    indentation: 4,
    PORT: '3001',
    SWITCH_HEADER: 'X-SWITCH-ID',
    name: /^(_)?[A-Za-z][A-Za-z0-9_]{0,}$/
};