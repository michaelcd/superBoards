class Api::CardsController < ApplicationController
  def create
    card = Card.new(card_params)
    card.author_id = current_user.id
    card.save

    list = List.find_by_id(card_params[:list_id])

    @board = Board.find_by_id(list.board_id)
    @lists = @board.lists.sort_by {|list| list.ord}
    render 'api/boards/show'
  end

  private
  def card_params
    params.require(:card).permit(:list_id, :ord, :title, :archived)
  end
end
