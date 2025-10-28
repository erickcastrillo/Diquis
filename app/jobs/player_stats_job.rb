class PlayerStatsJob < ApplicationJob
  queue_as :reports

  def perform(*args)
    # Do something later
  end
end
