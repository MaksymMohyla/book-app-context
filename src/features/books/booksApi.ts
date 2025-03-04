import { client } from '../../utils/api';
import { Product } from '../types';

const BIN_FOR_PRODUCTS = '/b/67c58dbbacd3cb34a8f41e88';

export const getProductsFromServer = () => {
  return client
    .get<{ record: { products: Product[] } }>(BIN_FOR_PRODUCTS)
    .then((res) => {
      console.log(res);

      return res.record.products;
    });
};

export const addProductToServer = async (product: Product) => {
  // const prevState = await getProductsFromServer();
  // console.log(prevState);

  return client.put<{ record: Product }>(BIN_FOR_PRODUCTS, {
    products: [product],
  });
};
