import { LoggerFactory } from './LoggerFactory';

const Logger = LoggerFactory.configure({
    id: 'demo_credit',
    level: 'all',
});

export { Logger };
