var client = new Vue({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: {
      round: null,
      team_info: [],
      columns: [
        { title: '队伍编号', width: 200, name: 'number' },
        { title: '总分', name: 'score', width: 126, align: 'center', sortable: true },
        { title: '本轮分', name: 'round_score', width: 126, align: 'center', sortable: true },
        { title: '总排名', name: 'rank', width: 126, align: 'center', sortable: true },
        { title: '本轮排名', name: 'round_rank', width: 126, align: 'center', sortable: true },
    ],
    },
    mounted() {
      this.$nextTick(function () {
        showParticles();
        this.$refs['fileinput'].addEventListener('change', this.handle_put_file_select, false);
      })
  
    },
    methods: {
      set_round() {
        $.get('/game2/api/set/round/?round='+this.round).then(r => {
          if(r.code===0){
            console.log('round 更改成功')
          }
        })
      },
  
      update_ranklist(){
        for(i in this.team_info)
        // console.log(i)
        $.post('/game2/api/update/ranklist/',this.team_info[i]).then(r => console.log(r))
      },
  
      btnclick() {
        this.$refs['fileinput'].click()
      },
  
      upload(){
        this.set_round();
        this.update_ranklist();
      },
  
      handle_put_file_select(evt) {
  
        var files = evt.target.files;
        // Get the file info and load its data.
        var f = files[0];
        put_file_name = f.name;
        var reader = new FileReader();
        let that = this;
        reader.onload = function (e) {
          let txt = String.fromCharCode.apply(null, new Uint8Array(e.target.result));
          let info = txt.split('\n');
          that.round = info[0];
          // console.log(info.slice(1, 11))
          that.team_info = info.slice(1, 11).map((i) => {
            let infos = i.split(':')
            let team_num = infos[0]
            let team_data = infos[1].split(',')
  
            // console.log(team_data[2])
            return {
              round: that.round,
              number: team_num,
              score: team_data[0],
              round_score: team_data[1],
              rank: team_data[2],
              round_rank: team_data[3]
            }
  
          });
          // console.log(that.team_info)
        };
        reader.readAsArrayBuffer(f);
      },
    }
  
  })