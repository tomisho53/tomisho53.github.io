# TIMLink 技術検証
○ GPS取得
○ オフライン処理
○ バックグラウンド処理
○ プッシュ通知

# Git Hub IO Webサイト構築
※ 参考サイト：https://techacademy.jp/magazine/6445
  -> 今回はユーザーサイト用
  -> ユーザーサイトはユーザ名とリポジトリ名と同様にする

○ GitHubリポジトリの作成
	- GitHubにログインして作成

○ ローカルにリポジトリをクローン
$ git clone https://github.com/tomisho53/tomisho53.github.io

○ HTML/CSS/JS 作成

○ Git リポジトリ コミット
$ git add --all
$ git commit -m "Initial commit"

○ Git プッシュ
$ git push -u origin master

○ Git プル
$ git pull

※ 403エラー発生
※ 参考サイト：https://qiita.com/tanishilove/items/3164ecf3f16585fa3bf2
$ git remote set-url origin https://tomisho53@github.com/tomisho53/tomisho53.github.io
	- tomisho53@　を追加
	- push時にパスワード入力

http://tomisho53.github.io


[object ServiceWorkerRegistration]
[object SyncManager]
 -> 現時点（2019/10/24） Safari未対応
 -> https://caniuse.com/#search=service%20worker%20sync
[object ServiceWorker]
 -> iOS Safariのみ対応