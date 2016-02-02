json.total_count @search_results.length
# json.results do
#   json.array! @search_results do |result|
#     result = result.searchable
#
#     case
#     when result.class == Board
#       json.partial!("api/boards/board", board: result)
#     when result.class == List
#       json.partial!("api/boards/list", list: result)
#     when result.class == Card
#       json.partial!("api/boards/card", card: result)
#     when result.class == Comment
#       json.partial!("api/boards/comment", comment: result)
#     end
#
#     json._type result.class.to_s
#   end
# end

json.results do
  json.boards do
    json.array! @boards do |board|
      json.partial!("api/boards/board", board: board)
    end
  end

  json.lists do
    json.array! @lists do |list|
      json.partial!("api/boards/list", list: list)
    end
  end

  json.cards do
    json.array! @cards do |card|
      json.partial!("api/boards/card", card: card)
    end
  end

  json.comments do
    json.array! @comments do |comment|
      json.partial!("api/boards/comment", comment: comment)
    end
  end
end
