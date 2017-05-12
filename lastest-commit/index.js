var apiUrl = 'https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha=';

var demo = new Vue({
  el: '#demo',
  data: {
    branches: ['master', 'dev'],
    currentBranch: 'master',
    commits: null
  },
  created: function() {
    this.fetchData()
  },
  watch: {
    currentBranch: 'fetchData'
  },
  filters: {
    // 过滤数据。在html中用分割符 |+ 过滤方法
    truncate: function(v) {
      var newline = v.indexOf('\n');
      return newline > 0 ? v.slice(0, newline) : v
    },
    formatDate: function(v) {
      return v.replace(/T|Z/g, ' ')
    }
  },
  methods: {
    fetchData: function() {
      // xhr方式调用接口获取数据
      var xhr = new XMLHttpRequest();
      var self = this;
      xhr.open('GET', apiUrl + self.currentBranch)
      xhr.onload = function() {
        self.commits = JSON.parse(xhr.responseText);
        console.log(self.commits[0].html_url)
      }
      xhr.send()
    }
  }
})