var app = new Vue({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: {
      teams_row1: [],
      teams_row2: [],
      teams: [],
      rank: [],
      round: '',
    },
    mounted() {
      this.$nextTick(function () {
        showParticles();
        this.get_round();
        setInterval(this.get_updates, 10000);
  
      })
  
    },
    methods: {
      get_round() {
        $.get('/api/race1/get/round/').then(r => {
          this.round = r.data.round;
          this.get_updates()
        })
      },
      
      get_updates() {
        $.get('/api/race1/update/?round=' + this.round).then(
          r => {
            this.teams = r.data.team_infos;
            this.round = r.data.round;
            this.rank = r.data.team_infos.sort((i, j) => {
              if (i.rank > j.rank)
                return 1
              if (i.rank < j.rank)
                return -1
  
              return 0
            })
  
            console.log(this.rank[0].rank)
          }
        )
      },
  
       
    }
  
  })