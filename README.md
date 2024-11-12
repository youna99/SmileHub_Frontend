# <img src="https://github.com/user-attachments/assets/d32dab93-440f-413f-b380-d70518a612ca" alt="Smile Hub" width="30"/> Smile Hub
## 👋🏻 프로젝트 소개
React와 Node.js 기반의 중고거래 플랫폼 <br>
중고거래 시 새상품 가격을 손쉽게 확인하고 비교할 수 있도록 지원 <br>
기간: 2024.08.26 ~ 09.13 (3주) <br>
팀 구성: 백엔드(2명), 프론트엔드(2명) <br>
역할: **프론트엔드**

## 👩🏻‍💻 맡은 기능

### 로그인 / 회원가입

![회원가입, 로그인](https://github.com/user-attachments/assets/2ec4bf1d-d4d4-4c07-bef3-b8dc334ca1cc)
- React Hook Form과 카카오 주소 API를 활용해 회원가입 기능을 구현
- 로그인 시 토큰을 로컬 스토리지에 저정해 인증 관리 및 API 요청에 활용
- 에러 및 성공 메시지를 통해 즉각적인 피드백 제

### 마이페이지
**1. 찜/판매/구매 내역 & 배송현황**

![찜 구매 판매 움짤](https://github.com/user-attachments/assets/dcfc6848-47d7-44f8-92d2-1658f81e60bc)

- useEffect 훅을 사용해 컴포넌트 마운트 시 데이터를 비동기적으로 가져와 실시간 정보 제공

**2. 회원정보, 프로필 수정 & 결제 기능에 쓰일 가상 머니 충전 기능** 

![프로필 정보수정 머니충전 움짤](https://github.com/user-attachments/assets/b5cd6316-287a-48c7-a679-e2c98c8bde5e)

- 기존 회원가입에서 사용한 폼을 커스터마이징하여 재사용
- 보안 강화를 위해 정보 수정 시 기존 비밀번호 확인 추가
- 결제 기능을 MoneyModal로 모듈화하여 재사용을 높임

### 결제 기능

![결제페이지 머니충전 판매내역 움짤](https://github.com/user-attachments/assets/f4f90950-937e-4280-8fdf-24020e8a03f4)
- 회원가입에서 사용한 카카오주소API 컴포넌트를 재사용하여 주소 입력과정을 간소화하고 일관성을 유지
- 마이페이지에서 사용한 머니 충전 기능 컴포넌트를 재사용


## 모바일 뷰
<img src="https://github.com/user-attachments/assets/b5128eaa-df07-4741-ae4b-3be13671fc3b" width="300" heigth="400"/>
<img src="https://github.com/user-attachments/assets/6ee53f61-000f-4f95-a855-2f5d5e908a8b" width="300" heigth="400"/>
<img src="https://github.com/user-attachments/assets/44db6744-e38b-4665-a913-72553150bc31" width="300" heigth="350"/>
<img src="https://github.com/user-attachments/assets/710203d1-a450-4644-8ba9-f08e900fdb5d" width="300" heigth="500"/>
