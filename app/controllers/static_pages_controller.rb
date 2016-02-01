class StaticPagesController < ApplicationController

  # before_action :require_logged_in

  def root
  end

  def require_logged_in
    unless logged_in?
      redirect_to new_sessions_url
    end
  end

end
