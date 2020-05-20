class MembersController < ApplicationController
  def index
    members = Member.all
    render json: { data: members }
  end
end
