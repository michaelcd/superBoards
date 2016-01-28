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
    self.index
  end

  def index
    @boards = current_user.boards.where(archived: false)
    @boards.sort_by { |board| board.title }
  end

  def show
    @board = Board.find_by_id(params[:id])
    @lists = @board.lists.where(archived: false)
    @lists.sort_by {|list| list.ord}
    render :show
  end

  def update
    @board = Board.find_by_id(params[:board][:id])
    @board.title = params[:board][:title]
    @board.save
    @lists = @board.lists.sort_by {|list| list.ord}
    render :show
  end
end
