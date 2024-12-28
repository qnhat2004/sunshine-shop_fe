import React from 'react'
import axios from 'axios'

export const getImages = async () => {
    // Get images from server
    try {
        const response = await axios.get('http://localhost:8080/api/images');
        return response.data;
    } catch (error) {
        console.error(`Error: ${error}`);
        return [];
    }
} 

export const getProducts = async () => {
    // Get products from server
    try {
        const response = await axios.get('http://localhost:8080/api/products');
        return response.data;
    } catch (error) {
        console.error(`Error: ${error}`);
        return [];
    }
}

export const Hooks = () => {
  return (
    <div>Hooks</div>
  )
}
