var app = new Vue({
  el: '#app',
  delimiters: ['[[', ']]'],
  data: {
    teams: [],
    rank: [],
    round: '',
    audio: null,
    times: 0,
  },
  mounted() {
    this.$nextTick(function () {
      showParticles();
      this.audio = this.$refs['audio'];
      this.get_round();
      setInterval(this.get_updates, 10000);

    })

  },
  methods: {
    get_round() {
      $.get('/game2/api/get/round/').then(r => {
        this.round = r.data.round;
        this.get_updates()
      })
    },

    get_updates() {
      this.is_times_added();
      $.get('/game2/api/get/ranklist/?round=' + this.round).then(
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

          // console.log(this.rank[0].rank)
        }
      );
      // this.play();
    },

    is_times_added() {
      let t;
      $.get('/game2/api/get/times/').then(r => t = r.data.times);
      if(t !== this.times){
        this.play();
        this.times = t;
      }
    },

    play() {
      this.audio.play();
    },

  }

})