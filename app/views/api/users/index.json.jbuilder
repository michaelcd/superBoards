json.users do
  json.array!(@users.sort_by {|user| user.username }) do |user|
    json.partial!('user', user: user)
  end
end
