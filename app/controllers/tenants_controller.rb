# frozen_string_literal: true

class TenantsController < ApplicationController
  def switch
    academy_id = params[:academy_id]
    academy = Academy.find(academy_id)

    # Ensure the user has access to the academy they are trying to switch to
    authorize academy, :switch?

    # Set the current tenant for the user's session
    set_current_tenant(academy)

    # Redirect back to the previous page or to the root path
    redirect_back(fallback_location: root_path, notice: "Switched to #{academy.name}")
  end
end
