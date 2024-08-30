import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between items-center px-5 py-3 bg-gray-100">
        <button onClick={() => navigate(-1)}>뒤로가기</button>
      </div>
      <div className="flex justify-center items-center min-h-screen px-4">
        <form className="flex flex-col gap-4 w-full max-w-lg mx-auto">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="아이디(이메일)" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="example@naver.com"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="비밀번호" />
            </div>
            <TextInput id="password1" type="password" required />
          </div>
          <Button type="submit">로그인</Button>
          <div className="flex justify-end">
            <p className="mr-2">아직 회원이 아니신가요?</p>
            <Link to="/register">회원가입</Link>
          </div>
        </form>
      </div>
    </>
  );
}
