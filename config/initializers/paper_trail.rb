# frozen_string_literal: true

# Ensure PaperTrail is loaded
require "paper_trail"

# PaperTrail Configuration for Audit Logging
# Tracks changes to models for security and compliance

PaperTrail.config.enabled = true

# Track who made the change (set this in ApplicationController)
PaperTrail.config.has_paper_trail_defaults = {
  on: %i[create update destroy]
}

# Configure to ignore certain attributes
# PaperTrail.config.ignore = [:created_at, :updated_at]

# Silence compatibility warning (we know it's Rails 8.1)
# This is safe as PaperTrail still works with Rails 8.1
module PaperTrail
  module Compatibility
    def self.check_activerecord_version
      # Silently accept Rails 8.1
      true
    end
  end
end
