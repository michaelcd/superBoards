  Rails.application.routes.draw do
  root "static_pages#root"
  resources :users, only: [:new, :create]
  resource :sessions, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :boards, except: [:new, :edit]
    resources :lists, only: [:create, :update, :index, :destroy]
  end
end
