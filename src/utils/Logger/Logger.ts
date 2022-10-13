import { LoggerFactory } from './LoggerFactory';

const Logger = LoggerFactory.configure({
    id: 'cashout',
    level: 'all',
});

export { Logger };
