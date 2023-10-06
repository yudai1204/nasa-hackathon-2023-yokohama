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

## コーディング規則

### 関数
- function文は使わずに、なるべくアロー関数で定義する

### 命名規則
- snake_caseは基本的に使用しない（✖️user_data）
- 変数名 と 関数名 は基本的に先頭小文字のcamelCase（⭕️ useTest, ✖️ use_test , UseTest）
- コンポーネント名 と 型定義 は先頭大文字のPascalCase（⭕️ UserData, ✖️userData ）

### その他
- ページ本体は pagesディレクトリ以下に記述し、ファイル名は[camelCase].tsxにする
- ファイル名とページコンポーネントは同じ名前にする（ただしコンポーネント名はPascalCase、ページ名はcamelCase）
- コンポーネントは components以下に記述し、ファイル名は[camelCase].tsxにする
- ロジックだけを記述した関数は util 以下に記述し、[camelCase].tsにする(JSXを書かないので.tsxにしない！！)