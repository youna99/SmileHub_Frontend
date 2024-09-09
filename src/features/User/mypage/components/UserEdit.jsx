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
      <div className="flex justify-between items-center px-5 py-3 bg-gray-100">
        <button onClick={() => navigate(-1)}>뒤로가기</button>
      </div>
      <section className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">내 정보 수정</h1>
        <div className="border-b-2 border-gray-300 mb-4" />
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* 기존 비밀번호 확인 입력 */}
          {!isOldPasswordCorrect && (
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="기존 비밀번호 확인" />
              </div>
              <div className="flex">
                <TextInput
                  id="password"
                  type="password"
                  value={oldPassword}
                  {...register('password', {
                    required: '기존 비밀번호를 입력해 주세요.',
                    onChange: (e) => setOldPassword(e.target.value), // 상태 업데이트
                  })}
                  shadow
                  className="w-3/4"
                />
                <Button
                  type="button"
                  onClick={handlePasswordCheck}
                  className="w-1/4 ml-3"
                >
                  확인
                </Button>
              </div>
            </div>
          )}

          {/* 기존 비밀번호가 확인되면 아래 폼들이 나타남 */}
          {isOldPasswordCorrect && (
            <>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="아이디(이메일)" />
                </div>
                <p>{currentUser.email}</p>
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="old-password" value="기존 비밀번호 확인" />
                </div>
                <div className="flex">
                  <TextInput
                    id="old-password"
                    type="password"
                    value={oldPassword}
                    {...register('password', {
                      required: '기존 비밀번호를 입력해 주세요.',
                    })}
                    shadow
                    className="w-3/4"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
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
                      />
                    </div>
                    <TextInput
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
                      />
                    </div>
                    <TextInput
                      id="repeat-password"
                      type="password"
                      {...register('confirmPassword', {
                        required: '비밀번호 확인을 입력해 주세요.',
                        validate: (value) =>
                          value === newPassword ||
                          '비밀번호가 일치하지 않습니다.',
                      })}
                      shadow
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
                  <div>현재 닉네임: {currentUser.nickname}</div>
                  <Label htmlFor="nickname" value="변경할 닉네임" />
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                  <TextInput
                    className="w-full sm:w-4/5"
                    id="nickname"
                    type="text"
                    placeholder="변경할 닉네임을 입력해 주세요" // placeholder로 빈값 표시
                    value={checkNickname} // 상태와 연결
                    onChange={(e) => setCheckNickname(e.target.value)} // 상태 업데이트
                    shadow
                  />
                  <Button
                    className="w-full sm:w-auto"
                    onClick={handleCheckNickname} // 중복 확인 버튼
                  >
                    중복 확인
                  </Button>
                </div>
                {errors.nickname && (
                  <p className="text-red-500">{errors.nickname.message}</p>
                )}
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="age" value="나이" />
                </div>
                <TextInput
                  id="age"
                  type="number"
                  {...register('age', {
                    valueAsNumber: true,
                  })}
                  shadow
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
                    <Radio
                      id="default"
                      value=""
                      {...register('gender')}
                      checked={
                        currentUser.gender === '' || currentUser.gender === null
                      } // '선택안함'일 때 체크
                    />
                    <Label htmlFor="default" className="ml-2">
                      선택안함
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Radio
                      id="male"
                      value="male"
                      {...register('gender')}
                      checked={currentUser.gender === true} // 남성일 때 체크
                    />
                    <Label htmlFor="male" className="ml-2">
                      남성
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Radio
                      id="female"
                      value="female"
                      {...register('gender')}
                      checked={currentUser.gender === false} // 여성일 때 체크
                    />
                    <Label htmlFor="female" className="ml-2">
                      여성
                    </Label>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-2 block">
                  <div>
                    현재주소: {currentUser.address.sido}{' '}
                    {currentUser.address.sigungu} {currentUser.address.bname}{' '}
                    {currentUser.address.detailAddress}
                  </div>
                  <Label htmlFor="address" value="변경할 주소" />
                </div>
                <div className="flex justify-between">
                  <TextInput
                    className="w-1/2"
                    type="text"
                    id="postcode"
                    placeholder="우편번호"
                    {...register('address.postcode')}
                  />
                  <Button onClick={() => setIsModalOpen(true)}>주소검색</Button>
                </div>
                <TextInput
                  placeholder="주소"
                  {...register('address.address')}
                />
                <div className="flex">
                  <TextInput
                    className="w-1/2"
                    placeholder="상세주소"
                    {...register('address.detailAddress')}
                  />

                  <TextInput
                    className="w-1/2"
                    placeholder="참고항목"
                    {...register('address.extraAddress')}
                  />
                </div>

                {errors.address && (
                  <p className="text-red-500">{errors.address.message}</p>
                )}
              </div>

              <Button type="submit">수정하기</Button>

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
