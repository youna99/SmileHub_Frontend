import React from 'react';
import { Label } from 'flowbite-react';
import AddressSearch from '../../features/User/Register/components/AddressSearch';
import { Link } from 'react-router-dom';

const RegisterPage = ({
  isModalOpen,
  setIsModalOpen,
  register,
  handleSubmit,
  errors,
  setValue,
  password,
  onSubmit,
  currentUser,
  navigate,
  checkEmail,
  setCheckEmail,
  checkNickname,
  setCheckNickname,
  handleCheckEmail,
  handleCheckNickname,
}) => {
  return (
    <main className="bg-gray-50">
      <div className="flex justify-between items-center px-2 pt-4 sm:px-5 sm:pt-4">
        <img
          src="/images/back.png"
          alt="back"
          onClick={() => navigate(-1)}
          className="w-5"
        />
      </div>

      <div className="flex justify-center">
        <form className="flex flex-col gap-4 w-full max-w-3xl my-5 mx-2">
          <Link to="/">
            <div className="flex flex-col items-center justify-center">
              <img src="/images/logo.png" alt="" className="w-1/4 flex " />
              <p className="text-4xl font-bold">Smile Hub</p>
            </div>
          </Link>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="email"
                value="아이디(이메일)"
                className="font-semibold"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
              <input
                className="w-full sm:w-4/5 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                id="email"
                type="email"
                placeholder="example@naver.com"
                {...register('email', {
                  required: '아이디(이메일)은 필수 입력 항목입니다.',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: '이메일 형식에 맞춰서 입력해주세요.',
                  },
                })}
                shadow
                value={checkEmail}
                onChange={(e) => setCheckEmail(e.target.value)}
              />
              <button
                type="button"
                className="w-full sm:w-auto p-3 bg-[#FEE715] text-black font-semibold shadow-sm rounded-lg  hover:bg-black hover:text-[#FEE715] transition"
                onClick={handleCheckEmail}
              >
                중복 확인
              </button>
            </div>
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-2 block">
            <Label
              htmlFor="password"
              value="비밀번호 (최소 하나의 대문자, 소문자, 숫자, 특수문자 포함 필수)"
              className="font-semibold"
            />
          </div>
          <input
            id="password"
            type="password"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            {...register('password', {
              required: '비밀번호는 필수 입력 항목입니다.',
              minLength: {
                value: 6,
                message: '비밀번호는 최소 6자 이상이어야 합니다.',
              },
              validate: {
                hasNumber: (value) =>
                  /[0-9]/.test(value) ||
                  '비밀번호에는 최소 하나의 숫자가 포함되어야 합니다.',
                hasSpecialChar: (value) =>
                  /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                  '비밀번호에는 최소 하나의 특수문자가 포함되어야 합니다.',
                hasUpperCase: (value) =>
                  /[A-Z]/.test(value) ||
                  '비밀번호에는 최소 하나의 대문자가 포함되어야 합니다.',
                hasLowerCase: (value) =>
                  /[a-z]/.test(value) ||
                  '비밀번호에는 최소 하나의 소문자가 포함되어야 합니다.',
              },
            })}
            shadow
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <div className="mb-2 block">
            <Label
              htmlFor="repeat-password"
              value="비밀번호 확인"
              className="font-semibold"
            />
          </div>
          <input
            id="repeat-password"
            type="password"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            {...register('confirmPassword', {
              required: '비밀번호 확인은 필수입니다.',
              validate: (value) =>
                value === password || '비밀번호가 일치하지 않습니다.',
            })}
            shadow
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}

          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="nickname"
                value="닉네임"
                className="font-semibold"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
              <input
                className="w-full sm:w-4/5 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                id="nickname"
                type="text"
                {...register('nickname', {
                  required: '닉네임은 필수 입력 항목입니다.',
                })}
                shadow
                value={checkNickname}
                onChange={(e) => setCheckNickname(e.target.value)}
              />
              <button
                type="button"
                className="w-full sm:w-auto p-3 bg-[#FEE715] text-black font-semibold shadow-sm  rounded-lg hover:bg-black hover:text-[#FEE715] transition"
                onClick={handleCheckNickname}
              >
                중복 확인
              </button>
            </div>
            {errors.nickname && (
              <p className="text-red-500">{errors.nickname.message}</p>
            )}
          </div>

          <div className="mb-2 block">
            <Label htmlFor="age" value="나이" className="font-semibold" />
          </div>
          <input
            id="age"
            type="number"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            {...register('age', {
              valueAsNumber: true,
              min: {
                value: 1,
                message: '유효한 나이를 입력하세요.',
              },
            })}
            shadow
          />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}

          <div>
            <div className="mb-2 block">
              <Label htmlFor="gender" value="성별" className="font-semibold" />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="default"
                  value="default"
                  {...register('gender')}
                  defaultChecked
                />
                <Label htmlFor="default" className="ml-2">
                  선택안함
                </Label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="male"
                  value="male"
                  {...register('gender')}
                />
                <Label htmlFor="male" className="ml-2">
                  남성
                </Label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="female"
                  value="female"
                  {...register('gender')}
                />
                <Label htmlFor="female" className="ml-2">
                  여성
                </Label>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="address" value="주소" className="font-semibold" />
            </div>
            <div className="flex pb-2">
              <input
                className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                type="text"
                id="postcode"
                placeholder="우편번호"
                // value={currentUser.address.postcode}
                {...register('address.postcode')}
              />
              <button
                type="button"
                className="p-3 mx-2 bg-[#FEE715] text-[#101820] hover:bg-[#101820] hover:text-[#FEE715] font-semibold rounded-lg transition"
                onClick={() => setIsModalOpen(true)}
              >
                주소검색
              </button>
            </div>

            <div className="flex gap-3">
              <input
                placeholder="주소"
                // value={currentUser.address.address}
                {...register('address.address')}
                className="p-3 my-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black "
              />
              <input
                className="w-1/2 p-3 my-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="참고항목"
                // value={currentUser.address.extraAddress}
                {...register('address.extraAddress')}
              />
              <input
                className="w-1/2 p-3 my-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="상세주소"
                {...register('address.detailAddress')}
              />
            </div>

            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}
          </div>

          <button
            onClick={handleSubmit(onSubmit)}
            className="p-3 rounded-lg font-semibold bg-[#FEE715] text-[#101820] hover:bg-[#101820] hover:text-[#FEE715] transition"
            type="button"
          >
            회원가입
          </button>

          {/* 주소 검색 Modal */}
          <AddressSearch
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            setValue={setValue}
          />
        </form>
      </div>
    </main>
  );
};

export default RegisterPage;
