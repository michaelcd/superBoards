json.boards do
  json.array!(@boards.sort_by {|board| board.title }) do |board|
    json.partial!('board', board: board)
  end
end

json.shared_boards do
  json.array!(@shared_boards.sort_by {|board| board.title }) do |board|
    json.partial!('board', board: board)
  end
end
