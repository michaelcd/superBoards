class Api::BoardsController < ApplicationController

  def create
    @board = Board.new(title: params[:title])
    @board.author_id = current_user.id
    @board.save

    render json: @board
  end

  def destroy
    @board = Board.find_by_id(params[:id])
    @board.destroy

    self.index
  end

  def index
    @boards = current_user.boards
    render json: @boards
  end

  def show
    @board = Board.find_by_id(params[:id])

    render json: @board
  end

  def update

  end

  # private
  # def board_params
  #   params.require(:board).permit(:title)
  # end
end
