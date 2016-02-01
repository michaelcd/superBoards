json.extract!(@card, :id, :list_id, :title, :ord, :archived, :author_id, :description)

json.comments do
  json.array!(@card.comments) do |comment|
    json.extract!(comment, :id, :card_id, :body, :author_id)
  end
end
