import React, { useState } from 'react';
import ProductUpdatePage from '../../../pages/Product/ProductUpdate/ProductUpdatePage';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setUserFields } from '../../store/userSlice';

const UpdateProductContainer = () => {

  return (
    <ProductUpdatePage
    />
  );
};

export default UpdateProductContainer;
