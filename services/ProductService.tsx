import axios from "axios";

const ProductService = ({ page, size }) => {
  try {
    const response: any = axios.get(
      `https://api.timbu.cloud/products?organization_id=e1d148ce83bc49f484355eaa63688dc2&reverse_sort=false&page=${page}&size=${size}&APP_ID=HSG0LF97QXC31T6&API_KEY=22e3ce5bfebb4cb390e436ac72aff5fc20240713130918690932`
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
};
export default ProductService;
