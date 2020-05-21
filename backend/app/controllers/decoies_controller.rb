class DecoiesController < ApplicationController
  def index
    decoies = Decoy.all
    render json: decoies, states: 200
  end

  def create
    decoy = Decoy.new({
      name: params[:name]
    })
    decoy.save
    setAllDecoy
  end

  def destroy
    decoy = Decoy.find(params[:id])
    decoy.destroy
    setAllDecoy
  end

  def update
    decoy = Decoy.find(params[:id])
    decoy.name = params[:name]
    decoy.save
    setAllDecoy
  end

  private
  def setAllDecoy
    decoies = Decoy.all
    render json: decoies
  end
end
