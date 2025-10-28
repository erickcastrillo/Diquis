# frozen_string_literal: true

require "generators/factory_bot"

module FactoryBot
  module Generators
    class ModelGenerator < Base
      argument :attributes, type: :array, default: [], banner: "field:type field:type"

      class_option :slice, type: :string, desc: "Generate factory in specific slice directory"

      def create_fixture_file
        if slice_name = options[:slice]
          # Generate in slice directory
          factory_dir = File.join("app", "slices", slice_name, "spec", "factories")
          template "fixtures.rb", File.join(factory_dir, "#{table_name}.rb")
        else
          # Use default behavior - generate in spec/factories
          template "fixtures.rb", File.join("spec", "factories", "#{table_name}.rb")
        end
      end
    end
  end
end
