# NASAハッカソン

デプロイ先
[https://nasa-hackathon-2023-yokohama.vercel.app/]

## インストール

まず以下のコマンドで依存関係をインストール

```bash
npm i
```

以下のコマンドでサーバーを起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)で起動する。


## 導入済みライブラリ

### 整形・コーディング規則

- eslint
- prettier

### 主要ライブラリ

- [ChakraUI](https://chakra-ui.com/docs/components)
- [Three.js](https://threejs.org/)
- [react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) (Three.jsをreactで使えるようにするライブラリ)

### 便利系ライブラリ

- react-hook-form（フォームを簡単に管理できる）
- axios（REST APIの通信のため）