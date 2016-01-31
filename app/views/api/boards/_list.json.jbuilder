json.extract!(list, :id, :board_id, :title, :ord, :archived)
json.cards do
  json.array!(list.cards.where(archived: false).sort_by { |card| card.ord }) do |card|
    json.partial! 'api/boards/card', card: card
  end
end
