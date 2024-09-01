import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';

export default function LoginPage({
  navigate,
  handleSubmit,
  setEmail,
  setPassword,
  error,
}) {
  return (
    <>
      <div className="flex justify-between items-center px-5 py-3 bg-gray-100">
        <button onClick={() => navigate(-1)}>뒤로가기</button>
      </div>
      <div className="flex justify-center items-center min-h-screen px-4">
        <form
          className="flex flex-col gap-4 w-full max-w-lg mx-auto"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="아이디(이메일)" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="example@naver.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="비밀번호" />
            </div>
            <TextInput
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
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
