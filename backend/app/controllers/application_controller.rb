class ApplicationController < ActionController::API
        include DeviseTokenAuth::Concerns::SetUserByToken
        skip_before_action :verify_authenticity_token, if: :devise_controller?, raise: false # APIではCSRFチェックをしない
        # before_action :authenticate_member!, unless: :devise_controller?
        # before_action :configure_permitted_parameters, if: :devise_controller? 

        
end
