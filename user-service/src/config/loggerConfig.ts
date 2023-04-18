import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';

export const loggerConfig = {
  logger: WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
        format: winston.format.combine(
          winston.format.colorize({ all: true }),
          winston.format.timestamp(),
          winston.format.prettyPrint(),
          nestWinstonModuleUtilities.format.nestLike('SeolApp', {
            prettyPrint: true,
          }),
        ),
      }),
    ],
  }),
};
