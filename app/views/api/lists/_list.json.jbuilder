json.extract!(list, :id, :board_id, :title, :ord, :archived)
json.cards do
  json.array!(list.cards) do |card|
    json.partial! 'card', card: card
  end
end
