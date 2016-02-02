class Api::BoardsController < ApplicationController

  def create
    @board = Board.new(title: params[:board][:title])
    @board.author_id = current_user.id
    @board.save
    render json: @board
  end

  def destroy
    @board = Board.find_by_id(params[:id])
    @board.destroy
    @boards = current_user.boards.where(archived: false)
    render :index
  end

  def index
    @boards = current_user.boards.where(archived: false)
    @shared_boards = current_user.shared_boards.where(archived: false)
  end

  def show
    @board = Board.find_by_id(params[:id])
  end

  def update
    @board = Board.find_by_id(board_params[:id])
    @board.update!(board_params)
    render :show
  end

  private
  def board_params
    params.require(:board).permit(:id, :title, :archived)
  end
end
