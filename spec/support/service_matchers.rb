RSpec::Matchers.define :be_success do
  match do |result|
    result.success?
  end

  failure_message do |result|
    "expected service result to be successful, but got errors: #{result.errors}"
  end
end

RSpec::Matchers.define :be_error do
  match do |result|
    result.error?
  end

  failure_message do |result|
    "expected service result to be an error, but it was successful"
  end
end
