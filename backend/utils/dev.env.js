import dotenv from "dotenv"
dotenv.config();
export const Auth_Failure_Link=process.env.Auth_Failure_Link|| "";
export const Cookie_Key=process.env.Cookie_Key||""
export const forgot_Link=process.env.forgot_Link||""
export const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID||""
export const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET||""
export const JwtSecret=process.env.JwtSecret||""
export const mongoURL=process.env.mongoURL||""
export const nodeMailerkey=process.env.nodeMailerkey||""
export const STRIPE_KEY =process.env.STRIPE_KEY||""
export const USER_EMAIL=process.env.USER_EMAIL||""
export const clodudinaryImage=process.env.clodudinaryImage||""
export const stripe=process.env.stripe||"";
export const port=process.env.PORT|| 3005;
export const wallStreetApiKey=process.env.wallStreetApiKey
export const liveStockPriceLink=process.env.liveStockPriceLink;
export const wallStreetApiLink=process.env.wallStreetApiLink;
export const stockProfile=process.env.stockProfile;
export const historicStockPrices=process.env.historicStockPrices;
export const livestockprices=process.env.livestockprices;