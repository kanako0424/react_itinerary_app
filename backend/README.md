# backend
- バックエンドの API サーバーです。
- Cloud Functions と TypeScript を採用しています。

## setup
- backendディレクトリに移動してプロジェクトを初期化します。

```bash
cd backend
npm install
```

## run
- ローカル環境で動作のテストをする場合は以下を実行します。

```bash
npm run serve
```

- 動作確認するには、`http://127.0.0.1:5001/itinerary-app-431911/us-central1/{entryPoint}`にアクセスしてください。
- **entryPoint**にはindex.tsからexportされた変数名が入ります。


## deploy
```bash
firebase deploy
```