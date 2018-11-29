var app = new Vue({
  el: '#app',
  delimiters: ['[[', ']]'],
  data: {
    teams: [],
    teams_row1: [],
    teams_row2: [],
    rank: [],
    round: '',
    audio: null,
    times: 0,
    slide: true,
    change: true,
    allowChange: false
  },
  mounted() {
    this.$nextTick(function () {
      showParticles();
      // setTimeout(()=>this.slide=true, 300);
      this.audio = this.$refs['audio'];
      this.get_round();
      setInterval(this.get_updates, 2800);

    })

  },
  methods: {
    get_round() {
      $.get('/game1/api/get/round/').then(r => {
        this.round = r.data.round;
        this.get_updates()
      })
    },

    get_updates() {
      this.is_times_added();
      $.get('/game1/api/get/ranklist/?round=' + this.round).then(
        r => {
          this.teams = r.data.team_infos;
          this.teams_row1 = r.data.team_infos.slice(0, 5);
          this.teams_row2 = r.data.team_infos.slice(5, 10);
          
          if (this.round * r.data.round < 0) {
            // this.change = !this.change;
            // setTimeout(() => this.change = !this.change, 300)
            this.allowChange = !this.allowChange;
          }

          setTimeout(() => this.round = r.data.round, 1400);
          this.rank = r.data.team_infos.sort((i, j) => {
            if (i.rank > j.rank)
              return 1
            if (i.rank < j.rank)
              return -1

            return 0
          })

          // console.log(this.rank[0].rank)
        }
      );
      // this.play();
    },

    is_times_added() {
      let t;
      $.get('/game1/api/get/times/').then(r => {
        t = r.data.times;
        if (t !== this.times) {
          this.play();
          this.times = t;
        }
      });

    },

    play() {
      this.audio.play();
      this.slide = !this.slide;
      let that = this;
      setTimeout(() => {
        this.slide = !this.slide;
        setTimeout(() => {
          if (this.allowChange) {
            this.change = !this.change;
            setTimeout(() => that.change = !that.change, 500);
            this.allowChange = !this.allowChange;
          }
        }, 1000)

      }, 300);
    },

  }

})