import axios from "axios";
import cron from "node-cron";
import PriceNotification from "./models/notification.model.js";
import { PriceReachHtml, sendNotification } from "./utils/Email/custom.js";
import { liveStockPriceLink, wallStreetApiKey } from "./utils/dev.env.js";

cron.schedule('*/1 * * * *', async () => { 
  try {
    const distinctSymbols = await PriceNotification.distinct('symbol');
    if (distinctSymbols.length > 0) {
      const options = {
        method: "GET",
        url: liveStockPriceLink,
        params: {
          apikey: wallStreetApiKey,
          fields: "symbol,price,percentChange,low,high,name,volume",
          format: "json",
          symbols: distinctSymbols.join(',')
        },
      };

      const apiResponse = await axios(options);
      const currentPrices = apiResponse?.data?.response;

      for (const currentPrice of currentPrices) {
        console.log(currentPrice);
        
        const notifications = await PriceNotification.find({
          symbol: currentPrice.symbol,
          $or: [
            { priceCondition: 'greater', futureStockPrice: { $lt: currentPrice.price } },
            { priceCondition: 'greaterOrEqual', futureStockPrice: { $lte: currentPrice.price } },
            { priceCondition: 'lower', futureStockPrice: { $gt: currentPrice.price } },
            { priceCondition: 'lowerOrEqual', futureStockPrice: { $gte: currentPrice.price } },
          ]
        });

        for (let notification of notifications) {
          const { symbol, currentStockPrice, futureStockPrice, email, name } = notification;
          console.log(notification);

          const html = PriceReachHtml("Mr", name, symbol, futureStockPrice, currentStockPrice);
          await sendNotification(email, html, "Demo price notification");

          console.log(`Stock ${symbol} has reached the target price of ${futureStockPrice}. Notification sent to ${email}`);

          await PriceNotification.deleteOne({ _id: notification._id });
        }
      }
    }
  } catch (error) {
    console.error('Error fetching or processing notifications:', error.message);
  }
}, {
  timezone: 'Asia/Kolkata' 
});
