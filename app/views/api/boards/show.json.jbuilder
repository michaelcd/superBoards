json.extract!(@board, :id, :author_id, :title, :archived)

json.lists do
  json.array!(@lists) do |list|
    json.partial! 'list', list: list
  end
end
