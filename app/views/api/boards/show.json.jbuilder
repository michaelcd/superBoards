json.extract!(@board, :id, :author_id, :title, :archived)

json.lists do
  json.array!(@board.lists.sort_by { |list| list.ord }) do |list|
    json.partial! 'api/boards/list', list: list
  end
end
