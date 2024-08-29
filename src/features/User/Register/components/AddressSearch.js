import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { setUserField } from '../../store/userSlice';

// 주소 api
const AddressSearch = ({ isOpen, onRequestClose }) => {
  const dispatch = useDispatch();

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    // Redux 상태 업데이트
    dispatch(setUserField({ field: 'address.postcode', value: data.zonecode }));
    dispatch(setUserField({ field: 'address.address', value: fullAddress }));
    dispatch(
      setUserField({ field: 'address.extraAddress', value: extraAddress }),
    );

    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="주소 검색"
      ariaHideApp={false}
    >
      <DaumPostcode onComplete={handleComplete} />
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default AddressSearch;
