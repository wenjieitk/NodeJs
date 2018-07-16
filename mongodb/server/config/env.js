const port = process.env.PORT || 3000;

const env = (process.env.NODE_ENV === 'test') ? 'test' 
                : (port === 3000) ?  'development' 
                    : process.env.NODE_ENV;

console.log('Starting in env ***** ',env);


module.exports = {
    port,
    env
};