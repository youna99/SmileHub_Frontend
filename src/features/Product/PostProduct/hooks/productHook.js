import { useDispatch, useSelector } from 'react-redux';
import {
  setProductName,
  setCategory,
  setDescription,
  setTags,
  setPrice,
  setImages,
  postProduct,
} from '../store/ProudctSlice';

export const useProduct = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  const setProduct = {
    setProductName: (productName) => dispatch(setProductName(productName)),
    setCategory: (category) => dispatch(setCategory(category)),
    setDescription: (description) => dispatch(setDescription(description)),
    setTags: (tags) => dispatch(setTags(tags)),
    setPrice: (price) => dispatch(setPrice(price)),
    setImages: (images) => dispatch(setImages(images)),
    postProduct: () => dispatch(postProduct()),
  };
  return { product, setProduct };
};
