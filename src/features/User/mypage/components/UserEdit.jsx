import React from 'react';
import { Button, Label, TextInput, Radio, Checkbox } from 'flowbite-react';
import AddressSearch from '../../Register/components/AddressSearch';

const UserEdit = ({
  isModalOpen,
  setIsModalOpen,
  register,
  handleSubmit,
  errors,
  setValue,
  onSubmit,
  currentUser,
  isChangingPassword,
  setIsChangingPassword,
  navigate,
  newPassword,
  isOldPasswordCorrect,
  setOldPassword,
  oldPassword,
  handlePasswordCheck,
  checkNickname,
  handleCheckNickname,
  setCheckNickname,
}) => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pt-4 sm:px-5 sm:pt-4">
        <img
          src="/images/back.png"
          alt="back"
          onClick={() => navigate(-1)}
          className="w-5"
        />
      </div>
      <section className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">내 정보 수정</h1>
        <div className="border-b-2 border-gray-300 mb-4" />
        <form className="flex flex-col gap-4 w-full">
          {/* 기존 비밀번호 확인 입력 */}
          {!isOldPasswordCorrect && (
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="password"
                  value="기존 비밀번호 확인"
                  className="font-semibold"
                />
              </div>
              <div className="flex justify-between">
                <input
                  id="password"
                  type="password"
                  value={oldPassword}
                  {...register('password', {
                    required: '기존 비밀번호를 입력해 주세요.',
                    onChange: (e) => setOldPassword(e.target.value), // 상태 업데이트
                  })}
                  shadow
                  className="w-full sm:w-3/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button
                  type="button"
                  onClick={handlePasswordCheck}
                  className="w-1/4 ml-3 p-3 bg-gray-400 text-white rounded-lg hover:bg-gray-600 transition"
                >
                  확인
                </button>
              </div>
            </div>
          )}

          {/* 기존 비밀번호가 확인되면 아래 폼들이 나타남 */}
          {isOldPasswordCorrect && (
            <>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="email"
                    value="아이디(이메일)"
                    className="font-semibold"
                  />
                </div>
                <p>{currentUser.email}</p>
              </div>

              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="old-password"
                    value="기존 비밀번호 확인"
                    className="font-semibold"
                  />
                </div>
                <div className="flex">
                  <input
                    id="old-password"
                    type="password"
                    value={oldPassword}
                    {...register('password', {
                      required: '기존 비밀번호를 입력해 주세요.',
                    })}
                    shadow
                    className="w-full sm:w-4/5 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="changePassword"
                  checked={isChangingPassword}
                  onChange={(e) => setIsChangingPassword(e.target.checked)}
                />
                <Label htmlFor="changePassword">비밀번호 변경하기</Label>
              </div>

              {isChangingPassword && (
                <>
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="newPassword"
                        value="변경할 비밀번호 (최소 하나의 대문자, 소문자, 숫자, 특수문자 포함 필수)"
                        className="font-semibold"
                      />
                    </div>
                    <input
                      id="newPassword"
                      type="password"
                      {...register('newPassword', {
                        required: '비밀번호를 입력해 주세요.',
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
                      className="w-full sm:w-4/5 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    {errors.password && (
                      <p className="text-red-500">
                        {errors.newPassword.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="repeat-password"
                        value="변경할 비밀번호 확인"
                        className="font-semibold"
                      />
                    </div>
                    <input
                      id="repeat-password"
                      type="password"
                      {...register('confirmPassword', {
                        required: '비밀번호 확인을 입력해 주세요.',
                        validate: (value) =>
                          value === newPassword ||
                          '비밀번호가 일치하지 않습니다.',
                      })}
                      shadow
                      className="w-full sm:w-3/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </>
              )}
              <div>
                <div className="mb-2 block">
                  <div className="font-bold text-xl mb-2">
                    현재 닉네임: {currentUser.nickname}
                  </div>
                  <Label
                    htmlFor="nickname"
                    value="닉네임"
                    className="font-semibold"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                  <input
                    id="nickname"
                    type="text"
                    {...register('nickname')}
                    value={checkNickname} // 상태와 연결
                    onChange={(e) => setCheckNickname(e.target.value)} // 상태 업데이트
                    shadow
                    className="w-full sm:w-3/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <button
                    type="button"
                    className="w-full sm:w-auto p-3 bg-gray-400 text-white rounded-lg hover:bg-gray-600 transition"
                    onClick={handleCheckNickname} // 중복 확인 버튼
                  >
                    중복 확인
                  </button>
                </div>
                {errors.nickname && (
                  <p className="text-red-500">{errors.nickname.message}</p>
                )}
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="age" value="나이" className="font-semibold" />
                </div>
                <input
                  id="age"
                  type="number"
                  {...register('age', {
                    valueAsNumber: true,
                  })}
                  shadow
                  className="w-full sm:w-3/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.age && (
                  <p className="text-red-500">{errors.age.message}</p>
                )}
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="gender" value="성별" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="default"
                      value=""
                      {...register('gender')}
                      defaultChecked={
                        currentUser.gender === '' || currentUser.gender === null
                      }
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
                      defaultChecked={currentUser.gender === true}
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
                      defaultChecked={currentUser.gender === false}
                    />
                    <Label htmlFor="female" className="ml-2">
                      여성
                    </Label>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-2 block">
                  <div className="text-xl font-semibold">
                    현재주소: {currentUser.address.sido}{' '}
                    {currentUser.address.sigungu} {currentUser.address.bname}{' '}
                    {currentUser.address.detailAddress}
                  </div>
                  <Label
                    htmlFor="address"
                    value="변경할 주소"
                    className="font-semibold"
                  />
                </div>
                <div className="flex justify-between">
                  <input
                    className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    type="text"
                    id="postcode"
                    placeholder="우편번호"
                    {...register('address.postcode')}
                  />
                  <button
                    type="button"
                    className="p-3 bg-gray-400 text-white rounded-lg hover:bg-gray-600s transition"
                    onClick={() => setIsModalOpen(true)}
                  >
                    주소검색
                  </button>
                </div>
                <input
                  placeholder="주소"
                  {...register('address.address')}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black pb-2"
                />
                <div className="flex">
                  <input
                    className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="상세주소"
                    {...register('address.detailAddress')}
                  />

                  <input
                    className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="참고항목"
                    {...register('address.extraAddress')}
                  />
                </div>

                {errors.address && (
                  <p className="text-red-500">{errors.address.message}</p>
                )}
              </div>

              <button
                type="button"
                className="p-3 rounded-lg font-semibold bg-[#FEE715] text-[#101820] hover:bg-[#101820] hover:text-[#FEE715] transition"
                onClick={handleSubmit(onSubmit)}
              >
                수정하기
              </button>

              {/* 주소 검색 Modal */}
              <AddressSearch
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                setValue={setValue}
              />
            </>
          )}
        </form>
      </section>
    </>
  );
};

export default UserEdit;
