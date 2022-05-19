import dotenv from 'dotenv';
dotenv.config();

export const CREDENTIALS = {
    VALID_USER: {
        USERNAME: process.env.USERNAME,
        PASSWORD: process.env.PASSWORD
    }
}

export const URL = {
    PRODUCTION : 'https://demoqa.com',// url already public, no need to hide it
    PREPRODUCTION : process.env.PREPRODUCTION_URL// example of pre-production private environment/url
}