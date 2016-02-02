json.extract!(card, :id, :list_id, :title, :ord, :archived, :author_id, :description)
json.board_id card.board.id
