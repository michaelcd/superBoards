class Api::UtilsController < ApplicationController

  def search
    @search_results = PgSearch
      .multisearch(params[:query])
      .includes(:searchable)
      .page(params[:page])
    @search_results = @search_results.map {|result| result.searchable}
    @boards = @search_results.select {|result| result.class == Board}
    @lists = @search_results.select {|result| result.class == List}
    @cards = @search_results.select {|result| result.class == Card}
    @comments = @search_results.select {|result| result.class == Comment}
  end


end
