class Api::CardsController < ApplicationController
  def create
    card = Card.new(card_params)
    card.author_id = current_user.id

    card.save

    list = List.find_by_id(card_params[:list_id])

    @board = Board.find_by_id(list.board_id)
    render 'api/boards/show'
  end

  def update
    @card = Card.find_by_id(card_params[:id])

    if params[:reorder]
      cards = @card.list.cards
      Card.reorder_cards(@card.ord, card_params[:ord].to_i, cards)
    else
      @card.update(card_params)
    end

    @board = @card.board
    render 'api/boards/show'
  end

  def destroy
    @card = Card.find_by_id(params[:id])
    @board = @card.board
    @card.destroy

    render 'api/boards/show'
  end

  private
  def card_params
    params.require(:card).permit(:id, :list_id, :ord, :title, :archived, :author_id)
  end
end
