Rails.application.routes.draw do
  devise_for :users
  root "users#show"
  resources :users, only: [:show, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index,:create]
  end
end
