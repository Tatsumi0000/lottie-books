.PHONY: setup run up exec 

# docker-compose.ymlに必要なイメージをビルド
# VueとRailsのライブラリをインストール
# Railsで必要なDBのセットアップ
.SILENT:
setup:  
			docker compose build ; \
			docker compose run --rm app /bin/bash -c "deno install" ; \
			echo "********************\n" ; \
			echo "docker compose up で開発環境を起動してください" ; \
			echo "\n********************"

run:
	docker compose run --rm app /bin/bash

up: 
	docker compose up -d

exec:
	docker compose exec app /bin/bash
