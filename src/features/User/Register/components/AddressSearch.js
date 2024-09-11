import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { setUserField } from '../../store/userSlice';

// 주소 api
const AddressSearch = ({
  isOpen,
  onRequestClose,
  setValue,
  onAddressSelect,
  updateRedux = true,
}) => {
  const dispatch = useDispatch();

  const handleComplete = (data) => {
    console.log('data =====>>', data);
    let addr = '';
    let extraAddr = '';
    let sido = data.sido;
    let sigungu = data.sigungu;
    let bname = data.bname;

    if (data.userSelectedType === 'R') {
      addr = data.roadAddress;
    } else {
      addr = data.jibunAddress;
    }

    if (data.userSelectedType === 'R') {
      if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
        extraAddr += data.bname;
      }
      if (data.buildingName !== '' && data.apartment === 'Y') {
        extraAddr +=
          extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
      }
      if (extraAddr !== '') {
        extraAddr = ' (' + extraAddr + ')';
      }
    }
    console.log('addr >>>>', addr);
    console.log('extraAddr >>', extraAddr);
    console.log('extraAddr >>', sido);
    console.log('extraAddr >>', sigungu);
    console.log('extraAddr >>', bname);

    const fullAddress = `${addr} ${extraAddr}`;

    // Redux 상태 업데이트 (updateRedux가 true인 경우에만)
    if (updateRedux) {
      dispatch(
        setUserField({ field: 'address.postcode', value: data.zonecode }),
      );
      dispatch(setUserField({ field: 'address.address', value: addr }));
      dispatch(
        setUserField({ field: 'address.extraAddress', value: extraAddr }),
      );
      dispatch(setUserField({ field: 'address.sido', value: sido }));
      dispatch(setUserField({ field: 'address.sigungu', value: sigungu }));
      dispatch(setUserField({ field: 'address.bname', value: bname }));
    }

    // react-hook-form 상태 업데이트 (setValue가 제공된 경우에만)
    if (setValue) {
      setValue('address.postcode', data.zonecode);
      setValue('address.address', addr);
      setValue('address.extraAddress', extraAddr);
      setValue('address.sido', sido);
      setValue('address.sigungu', sigungu);
      setValue('address.bname', bname);
    }

    // 결제 페이지에서 주소 변경 시
    if (onAddressSelect) {
      onAddressSelect(fullAddress);
    }

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
