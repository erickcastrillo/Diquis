# frozen_string_literal: true

# Controller for managing Academies
class AcademiesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_academy, only: %i[show edit update destroy]

  # GET /admin/academies
  def index
    authorize Academy
    @academies = policy_scope(Academy).order(created_at: :desc)

    render inertia: "Academies/Index",
            props: {
              academies: serialize_academies(@academies),
              can_create: policy(Academy).create?
            }
  end

  # GET /admin/academies/:id
  def show
    authorize @academy

    render inertia: "Academies/Show",
            props: {
              academy: serialize_academy(@academy),
              can_edit: policy(@academy).update?,
              can_delete: policy(@academy).destroy?
            }
  end

  # GET /admin/academies/new
  def new
    @academy = Academy.new
    authorize @academy

    render inertia: "Academies/New",
            props: {
              academy: serialize_academy(@academy),
              errors: {}
            }
  end

  # POST /admin/academies
  def create
    authorize Academy
    result = AcademyService.new(current_user).create_academy(academy_params)

    if result[:success]
      redirect_to admin_academy_path(result[:academy]),
                  notice: t(".success")
    else
      @academy = result[:academy] || Academy.new(academy_params)
      render inertia: "Academies/New",
              props: {
                academy: serialize_academy(@academy),
                errors: result[:errors].to_hash
              },
              status: :unprocessable_entity
    end
  end

  # GET /admin/academies/:id/edit
  def edit
    authorize @academy

    render inertia: "Academies/Edit",
            props: {
              academy: serialize_academy(@academy),
              errors: {}
            }
  end

  # PATCH/PUT /admin/academies/:id
  def update
    authorize @academy
    result = AcademyService.new(current_user).update_academy(@academy, academy_params)

    if result[:success]
      redirect_to admin_academy_path(result[:academy]),
                  notice: t(".success")
    else
      render inertia: "Academies/Edit",
              props: {
                academy: serialize_academy(@academy),
                errors: result[:errors].to_hash
              },
              status: :unprocessable_entity
    end
  end

  # DELETE /admin/academies/:id
  def destroy
    authorize @academy

    if @academy.destroy
      redirect_to admin_academies_path,
                  notice: t(".success")
    else
      redirect_to admin_academy_path(@academy),
                  alert: t(".error")
    end
  end

  private

  def set_academy
    @academy = Academy.find(params[:id])
  end

  def academy_params
    params.require(:academy).permit(:name, :address, :phone, :email, :subdomain, :status)
  end

  def serialize_academies(academies)
    academies.map { |academy| AcademySerializer.new(academy, policy: policy(academy)).as_json }
  end

  def serialize_academy(academy)
    AcademySerializer.new(academy, policy: policy(academy)).as_json
  end
end
