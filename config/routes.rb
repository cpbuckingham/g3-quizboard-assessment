Rails.application.routes.draw do
  resources :quizzes do
    resources :questions, shallow: true
  end
  root 'quizzes#index', via: :get
end
