import { allCategories, cartRoute, loginRoute, productsByCategory, singleProduct } from "./constants";
import { instance } from "./request";


export const getCategories = async () => {
    try {
        const response = await instance.get(allCategories);
        const data = await response.data;
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const getProductByCategories = async (category) => {
    try {
        const response = await instance.get(`${productsByCategory}/${category}`);
        const data = await response.data;
        return data;
    } catch (error) {
        console.log(error)
    }
}
export const getProductById = async (id) => {
    try {
        const response = await instance.get(`${singleProduct}/${id}`);
        const data = await response.data;
        return data;
    } catch (error) {
        console.log(error)
    }
}
export const Login = async (payload) => {
    try {
        const response = await instance.post(`${loginRoute}/`,payload);
        const data = await response.data;
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const addToCartList = async (payload) => {
    try {
        const response = await instance.post(`${cartRoute}/`, payload);
        const data = await response.data;
        return data;
    } catch (error) {
        console.log(error)
    }
}
    export const getCart = async (userId) => {
        try {
            const response = await instance.get(`${cartRoute}/user/${userId}`);
            const data = await response.data;
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    export const deleteCart = async (userId) => {
        try {
            const response = await instance.delete(`${cartRoute}/${userId}`);
            const data = await response.data;
            return data;
        } catch (error) {
            console.log(error)
        }
    }



  export function getCookie(name) {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1];
  
    return cookieValue ? decodeURIComponent(cookieValue) : null;
  }

  export function setCookie(name, value, expirationDays) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);
  
    const cookieValue =
      encodeURIComponent(value) +
      "; expires=" +
      expirationDate.toUTCString() +
      "; path=/";
  
    document.cookie = name + "=" + cookieValue;
  }