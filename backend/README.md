# backend
- バックエンドのAPIサーバーです。
- Cloud Functions とランタイムとして TypeScript を採用しています。

## setup
- backendディレクトリに移動してプロジェクトを初期化します。

```bash
cd backend
npm install
```

## run
- ローカル環境で動作のテストをする場合は以下を実行します。

```bash
npm run build
firebase emulators:start --only functions
```

## deploy
```bash
firebase deploy
```