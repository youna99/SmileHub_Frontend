import React from 'react';
import { Button, Label, TextInput, Radio } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
    registerUser,
    setUserField,
} from '../../features/User/store/userSlice';

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset, // 폼 리셋을 위한 기능 추가
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            gender: 'default',
        },
    });
    const password = watch('password');

    const dispatch = useDispatch();

    const onSubmit = (data) => {
        Object.keys(data).forEach((key) => {
            dispatch(setUserField({ field: key, value: data[key] }));
        });

        // 사용자 등록
        dispatch(registerUser());
        alert('회원가입이 완료되었습니다.');
        console.log('data', data);

        // 폼 리셋
        reset();
    };

    return (
        <form
            className="flex max-w-md flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email" value="아이디(이메일)" />
                </div>
                <TextInput
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
                />
                {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                )}
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password" value="비밀번호" />
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
                            value === password ||
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
                        validate: (value) =>
                            value > 0 || '나이는 0이상을 입력하세요.',
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
                        <Radio
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
                    <Label htmlFor="address" value="주소" />
                </div>
                <TextInput
                    id="address"
                    type="text"
                    {...register('address', {
                        required: '주소는 필수 입력 항목입니다.',
                    })}
                    shadow
                />
                {errors.address && (
                    <p className="text-red-500">{errors.address.message}</p>
                )}
            </div>
            <Button type="submit">회원가입</Button>
        </form>
    );
};

export default RegisterPage;
