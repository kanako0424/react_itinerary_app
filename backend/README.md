# backend
- バックエンドのAPIサーバーです。
- Cloud Functions とランタイムとして TypeScript を採用しています。

## setup
### Buildpackのインストール
- **macOS:** Homebrewが使える場合以下を実行してインストールください。その他の方法でインストールする場合は[こちら](https://buildpacks.io/docs/for-platform-operators/how-to/integrate-ci/pack/)を参照ください。

```bash
brew install buildpacks/tap/pack
```

- **Windows:** Chocolateyが使える場合以下を実行してインストールください。その他の方法でインストールする場合は[こちら](https://buildpacks.io/docs/for-platform-operators/how-to/integrate-ci/pack/)を参照ください。

```bash
choco install pack --version=0.35.1
```

## run
