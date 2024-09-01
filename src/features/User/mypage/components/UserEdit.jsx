import React from 'react';

import { Button, Label, TextInput, Radio } from 'flowbite-react';
import AddressSearch from '../../Register/components/AddressSearch';

const UserEdit = ({
  isModalOpen,
  setIsModalOpen,
  isPasswordMatch,
  register,
  handleSubmit,
  errors,
  setValue,
  password,
  handleOldPasswordCorrect,
  onSubmit,
  currentUser,
}) => {
  return (
    <>
      <div className="max-w-3xl mx-auto p-6">
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
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
                {...register('oldPassword', {
                  required: '기존 비밀번호를 입력해 주세요.',
                })}
                shadow
                className="w-3/4"
              />
              <Button
                type="button"
                onClick={handleOldPasswordCorrect}
                className="w-1/4 ml-3"
              >
                확인
              </Button>
            </div>
            {isPasswordMatch && (
              <p className="text-green-500">기존 비밀번호가 일치합니다.</p>
            )}
          </div>
          {isPasswordMatch && (
            <>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="새로운 비밀번호" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  {...register('password', {
                    required: '새로운 비밀번호를 입력해주세요.',
                    minLength: {
                      value: 6,
                      message: '비밀번호는 최소 6자 이상이어야 합니다.',
                    },
                  })}
                  shadow
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="repeat-password"
                    value="새로운 비밀번호 확인"
                  />
                </div>
                <TextInput
                  id="repeat-password"
                  type="password"
                  {...register('confirmPassword', {
                    required: '비밀번호 확인은 필수입니다.',
                    validate: (value) =>
                      value === password || '비밀번호가 일치하지 않습니다.',
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
              <Label htmlFor="nickname" value="닉네임" />
            </div>
            <TextInput
              id="nickname"
              type="text"
              {...register('nickname', {
                required: '닉네임은 필수 입력 항목입니다.',
              })}
              shadow
            />
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
            {errors.age && <p className="text-red-500">{errors.age.message}</p>}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="gender" value="성별" />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Radio
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
                <Radio id="male" value="male" {...register('gender')} />
                <Label htmlFor="male" className="ml-2">
                  남성
                </Label>
              </div>
              <div className="flex items-center">
                <Radio id="female" value="female" {...register('gender')} />
                <Label htmlFor="female" className="ml-2">
                  여성
                </Label>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="address" value="주소" />
            </div>
            <div className="flex justify-between">
              <TextInput
                className="w-1/2"
                type="text"
                id="postcode"
                placeholder="우편번호"
                value={currentUser.address.postcode}
                {...register('address.postcode')}
              />
              <Button onClick={() => setIsModalOpen(true)}>주소검색</Button>
            </div>
            <TextInput
              placeholder="주소"
              value={currentUser.address.address}
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
                value={currentUser.address.extraAddress}
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
        </form>
      </div>
    </>
  );
};

export default UserEdit;
