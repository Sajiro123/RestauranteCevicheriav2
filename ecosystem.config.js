module.exports = {
  apps: [
    {
      name: 'angular-app',
      script: 'cmd',
      args: '/c npx ng serve --host 0.0.0.0 --port 4200',
      interpreter: 'none',
      cwd: 'C:/xampp/htdocs/RestauranteCevicheriav2',
      autorestart: true
    }
  ]
};