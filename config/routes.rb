  Rails.application.routes.draw do
  root "static_pages#root"
  resources :users, only: [:new, :create]
  resource :sessions, only: [:new, :create, :destroy]

  get 'auth/facebook/callback', to: 'sessions#omniauth_facebook'

  namespace :api, defaults: {format: :json} do
    resources :board_shares, only: [:create, :destroy]
    resources :users, only: [:create, :index]
    resource :session, only: [:create, :destroy, :show]
    resources :boards, except: [:new, :edit]
    resources :lists, only: [:create, :update, :destroy]
    resources :cards, only: [:create, :update, :destroy, :show]
    resources :comments, only: [:create, :destroy, :update]
    get "search", to: "utils#search"
  end
end
