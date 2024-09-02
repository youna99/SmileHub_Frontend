import { useDispatch, useSelector } from 'react-redux';
import {
  setImages,
  setProductName,
  setCategory,
  setDescription,
  setTags,
  setPrice,
  setPriceOffer,
  postProduct,
} from '../../store/proudctSlice';

export const useProduct = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  const setProduct = {
    setImages: (images) => dispatch(setImages(images)),
    setProductName: (productName) => dispatch(setProductName(productName)),
    setCategory: (category) => dispatch(setCategory(category)),
    setDescription: (description) => dispatch(setDescription(description)),
    setTags: (tags) => dispatch(setTags(tags)),
    setPrice: (price) => dispatch(setPrice(price)),
    setPriceOffer: (priceOffer) => dispatch(setPriceOffer(priceOffer)),
    postProduct: () => dispatch(postProduct()),
  };
  return { product, setProduct };
};
