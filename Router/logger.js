const { createLogger,transports} = require('winston');

const logger = createLogger({
    transports:[
        new transports.Console({
            level:'info',
        })
    ]
})

// const logger = createLogger({
//     level: 'info',
//     transports: [
//      new transports.Console({
//       colorize: true,
//       name: 'console',
//       timestamp: () => new Date(),
//      }),
//     ],
//    })



module.exports = logger