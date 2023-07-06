import axios from "axios";

const devEnv = process.env.NODE_ENV !== "production"
//REACT_APP_LOCALHOST_API
//REACT_APP_PROD_API
const {REACT_APP_LOCALHOST_API,REACT_APP_PROD_API} = process.env

const API = axios.create({baseURL:`${devEnv ? REACT_APP_LOCALHOST_API : REACT_APP_PROD_API}`})

interface CartData {
    date:any,
    cart:Array<any>
}

export function get_Popular(){
    return API.get('/allPopular')
}

export function get_Pizza(){
   return API.get('/allPizza')
}

export function get_Pasta(){
    return API.get('/allPasta')
}

export function get_Salad(){
    return API.get('/allSalad')
}

export function get_Desert(){
    return API.get('/allDesert')
}

export function get_Order_Date(data:any){
    return API.post("/orderDate",data)
}

export function stripe_Payment(data:CartData){
    return API.post('/api/create-checkout-session',data)
}