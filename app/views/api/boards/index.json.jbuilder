json.array!(@boards.sort_by {|board| board.title }) do |board|
    json.partial!('board', board: board)
end
