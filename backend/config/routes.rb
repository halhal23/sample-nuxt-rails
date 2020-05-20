Rails.application.routes.draw do
  get 'members/index'
  mount_devise_token_auth_for 'Member', at: 'auth'
  root 'users#index'
  get 'me', to: 'users#me'
  resources :users, only: [:index, :create]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
