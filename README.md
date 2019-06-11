# Chat-Space
Chat-Space is a simple chat application.
We can create group and send messages.
![スクリーンショット](https://github.com/ratovia/chat-space/blob/readme-images/スクリーンショット%202019-06-11%2017.03.30.png "a")
![スクリーンショット2](https://github.com/ratovia/chat-space/blob/readme-images/75b1e9ee120dae23740eece10e5922ea.gif "スクリーンショット2")
## description
Tech::Expertの応用カリキュラムで作成したチャットアプリです。
Ajaxの非同期通信を使用して複数ユーザでのチャットを可能にしています。

# Environment
- Ruby(v2.5.1p57)
- Ruby on Rails(v5.0.7.2)
- HTML css javascript
- scss
- Haml
- jQuery
## database
- MySQL 5.6
- AWS S3

## deploy
- capistrano
- nginx
- unicorn
## test
- rspec
- bullet
- faker
- ractory_bot

# Database design

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|

### Association
- has_many :groups, through :group_users
- has_many :messages
- has_many :group_users


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users, through :group_users
- has_many :group_users
- has_many :messages

## group_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|text|text||
|image|string||
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
