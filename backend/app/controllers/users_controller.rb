class UsersController < ApplicationController
  before_action :authenticate_member!
  def index
    users = User.all
    render json: { status: 'SUCCESS!!', hello: 'users#index', data: users }
    # render json: users, status: 200
  end

  def me
    render json: { data: current_member }
  end

  def create
    user = User.new(params[:user].permit(:name))
    user.save
  end
end
