module.exports = {
    extends: [
        'react-app', // Create React App 기본 설정
        'plugin:prettier/recommended', // Prettier와 통합
    ],
    plugins: ['prettier'], // Prettier 플러그인 추가
    rules: {
        'prettier/prettier': 'error', // Prettier 규칙을 ESLint 오류로 설정
        // 추가적인 규칙을 여기에 정의할 수 있습니다.
    },
};
