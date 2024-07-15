import axios from 'axios';

import  { wallStreetApiKey, wallStreetApiLink, livestockprices, historicStockPrices, stockProfile } from '../utils/dev.env.js';

class WallStreetOddsAPI {
 static getLiveStockPrice=async(req,res)=>{
    try {
        const {fields,symbols}=req.body;
        const options = {
            method: "GET",
            url: `${wallStreetApiLink}/${livestockprices}`,
            params: {
              apikey: wallStreetApiKey,
              fields,
              format: "json",
              symbols
                
            }
        }
        const {data}=await axios.request(options);
        return res.status(200).json({
            response:data.response,
            msg:"successfull"
        });

    } catch (error) {
        res.status(500).jsnon({
            msg: 'Server Error'
        })
    }
 }
 static getStockHistory=async(req,res)=>{
    try {
        const {fields,symbol,from,to}=req.body;
        const options = {
            method: "GET",
            url: `${wallStreetApiLink}/${historicStockPrices}`,
            params: {
              apikey: wallStreetApiKey,
              fields,
              format: "json",
              symbol:symbol,
              from,
              to
                
            }
        }
        const {data}=await axios.request(options);
        return res.status(200).json({
            response:data.response,
            msg:"successfull"
        });
        
    } catch (error) {
        res.status(500).jsnon({
            msg: 'Server Error'
        })
    }
 }
 static getStockCompanyDetails=async(req,res)=>{
    try {
        const {fields,symbol}=req.body;
        const options = {
            method: "GET",
            url: `${wallStreetApiLink}/${stockProfile}`,
            params: {
              apikey: wallStreetApiKey,
              fields,
              format: "json",
              symbol:symbol
                
            }
        }
        const {data}=await axios.request(options);
        return res.status(200).json({
            response:data.response,
            msg:"successfull"
        });
        
    } catch (error) {
        res.status(500).jsnon({
            msg: 'Server Error'
        })
    }
 }
}

export default WallStreetOddsAPI;