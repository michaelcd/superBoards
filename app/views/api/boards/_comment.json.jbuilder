json.extract!(comment, :id, :card_id, :body, :author_id)
json.board_id comment.card.board.id
