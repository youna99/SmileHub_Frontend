module.exports = {
    extends: [
        'react-app', // Create React App 기본 설정
        'plugin:prettier/recommended', // Prettier와 통합
    ],
    plugins: ['prettier'], // Prettier 플러그인 추가
    rules: {
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
    },
};
