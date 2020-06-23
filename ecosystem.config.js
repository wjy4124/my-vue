module.exports = {
  deploy : {
    production : {
      user : 'root',
      host : 'tc',
      ref  : 'origin/master',
      repo : 'git@github.com:wjy4124/my-vue.git',
      path : '/www/my-vue',
      'pre-deploy-local': '',
      'pre-deploy' : 'git fetch',
      'post-deploy' : 'npm install && npm run build',
      'pre-setup': ''
    }
  }
};
