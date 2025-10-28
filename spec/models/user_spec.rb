require 'rails_helper'

RSpec.describe User, type: :model do
  subject { build(:user) }

  # Test factory validity
  describe 'factory' do
    it 'has a valid factory' do
      expect(subject).to be_valid
    end
  end

  # Test Devise modules
  describe 'devise modules' do
    it { should respond_to(:email) }
    it { should respond_to(:encrypted_password) }
    it { should respond_to(:reset_password_token) }
    it { should respond_to(:remember_created_at) }
  end

  # Test validations
  describe 'validations' do
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email).case_insensitive }
    it { should validate_presence_of(:password) }
    it { should validate_length_of(:password).is_at_least(6) }
  end

  # Test email format validation
  describe 'email validation' do
    it 'accepts valid email addresses' do
      valid_emails = [ 'user@example.com', 'test.email@domain.org', 'name+tag@site.net' ]
      valid_emails.each do |email|
        subject.email = email
        expect(subject).to be_valid
      end
    end

    it 'rejects invalid email addresses' do
      invalid_emails = [ 'invalid', '@domain.com', 'user@', 'user space@domain.com' ]
      invalid_emails.each do |email|
        subject.email = email
        expect(subject).not_to be_valid
      end
    end
  end

  # Test password confirmation
  describe 'password confirmation' do
    it 'requires password confirmation to match' do
      subject.password = 'password123'
      subject.password_confirmation = 'different'
      expect(subject).not_to be_valid
      expect(subject.errors[:password_confirmation]).to include("doesn't match Password")
    end
  end
end
