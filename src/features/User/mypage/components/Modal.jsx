import { Avatar, Tabs, Button } from 'flowbite-react';
const Modal = ({ isOpen, closeModal }) => {
  return (
    <div style={{ display: isOpen ? 'block' : 'none' }}>
      <br></br>
      <h2 style={{ color: 'red', fontFamily: '1' }}>머니 충전하기</h2>
      <button onClick={chargeMoney(5000)}>5000</button>&nbsp;
      <button onClick={chargeMoney(10000)}>10000</button>&nbsp;
      <button onClick={() => console.log('20000 충전')}>20000</button>&nbsp;
      <br></br>
      <Button onClick={closeModal}>닫기</Button>
    </div>
  );
};
const chargeMoney = ({ money }) => {
  console.log(`${money} 충전`);
  return money;
};
export default Modal;
