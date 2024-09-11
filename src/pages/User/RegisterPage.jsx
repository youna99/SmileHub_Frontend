import React, { useState } from 'react';
import { Button, Label, TextInput, Radio } from 'flowbite-react';
import AddressSearch from '../../features/User/Register/components/AddressSearch';

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
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  return (
    <>
      <div className="flex justify-between items-center px-5 py-3 bg-gray-100">
        <button onClick={() => navigate(-1)}>뒤로가기</button>
      </div>

      <div className="flex justify-center">
        <form
          className="flex flex-col gap-4 w-full max-w-3xl mt-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="아이디(이메일)" />
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
              <TextInput
                className="w-full sm:w-4/5"
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                className="w-full sm:w-auto"
                onClick={() => handleCheckEmail(email)}
              >
                중복 확인
              </Button>
            </div>
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="password"
                value="비밀번호 (최소 하나의 대문자, 소문자, 숫자, 특수문자 포함 필수)"
              />
            </div>
            <TextInput
              id="password"
              type="password"
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
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="repeat-password" value="비밀번호 확인" />
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
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="nickname" value="닉네임" />
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
              <TextInput
                className="w-full sm:w-4/5"
                id="nickname"
                type="text"
                {...register('nickname', {
                  required: '닉네임은 필수 입력 항목입니다.',
                })}
                shadow
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <Button
                className="w-full sm:w-auto"
                onClick={handleCheckNickname}
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
                min: {
                  value: 1,
                  message: '유효한 나이를 입력하세요.',
                },
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

            <div className="flex gap-2 pb-2">
              <TextInput
                className="w-1/2"
                type="text"
                id="postcode"
                placeholder="우편번호"
                {...register('address.postcode', {
                  required: '우편번호를 입력해주세요.',
                })}
              />
              <Button onClick={() => setIsModalOpen(true)}>주소검색</Button>
            </div>
            {errors.address?.postcode && (
              <p className="text-red-500">{errors.address.postcode.message}</p>
            )}

            <TextInput
              placeholder="주소"
              {...register('address.address', {
                required: '주소를 입력해주세요.',
              })}
              className="pb-2"
            />
            {errors.address?.address && (
              <p className="text-red-500">{errors.address.address.message}</p>
            )}

            <div className="flex gap-2">
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
            {errors.address?.detailAddress && (
              <p className="text-red-500">
                {errors.address.detailAddress.message}
              </p>
            )}
          </div>

          <Button type="submit">회원가입</Button>

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

export default RegisterPage;
