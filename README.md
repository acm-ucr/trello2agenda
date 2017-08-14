# Trello2Agenda

A program that generates a Google doc based on the state of a Trello Board

## APIs

* [Trello 1.0](https://developers.trello.com/v1.0)

## Features
* Grabs Trello list names
* Grabs Trello card names, id, url, members, description, dates, and other metadata
* Converts the Trello data to markdown

## API Keys

* ./config/keys.js
* Get your [trello.key](https://trello.com/app-key)
* Get your [trello.token](https://trello.com/1/authorize?expiration=never&scope=read,write,account&response_type=token&name=Server%20Token&key=bd6e574f7e6bb3f16a469f18c195dd45)
* Get your `trello.boardId`: Go onto your Trello board. The URL is in this format: `https://trello.com/b/{boardId}/{nameOfBoard}` 

Made with <3 by ACM@UCR
