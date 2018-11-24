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
        this.particles();
        this.$refs['fileinput'].addEventListener('change', this.handle_put_file_select, false);
      })
  
    },
    methods: {
      set_round() {
        $.get('/api/race1/set/round/?round='+this.round).then(r => {
          if(r.code===0){
            console.log('round 更改成功')
          }
        })
      },
  
      update_ranklist(){
        for(i in this.team_info)
        // console.log(i)
        $.post('/api/race1/update/ranklist/',this.team_info[i]).then(r => console.log(r))
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
  
  
      particles() {
        particlesJS('particles-js',
  
          {
            "particles": {
              "number": {
                "value": 80,
                "density": {
                  "enable": true,
                  "value_area": 800
                }
              },
              "color": {
                "value": "#ffffff"
              },
              "shape": {
                "type": "circle",
                "stroke": {
                  "width": 0,
                  "color": "#000000"
                },
                "polygon": {
                  "nb_sides": 5
                },
                "image": {
                  "src": "img/github.svg",
                  "width": 100,
                  "height": 100
                }
              },
              "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                  "enable": false,
                  "speed": 1,
                  "opacity_min": 0.1,
                  "sync": false
                }
              },
              "size": {
                "value": 5,
                "random": true,
                "anim": {
                  "enable": false,
                  "speed": 40,
                  "size_min": 0.1,
                  "sync": false
                }
              },
              "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
              },
              "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "attract": {
                  "enable": false,
                  "rotateX": 600,
                  "rotateY": 1200
                }
              }
            },
            "interactivity": {
              "detect_on": "canvas",
              "events": {
                "onhover": {
                  "enable": true,
                  "mode": "repulse"
                },
                "onclick": {
                  "enable": true,
                  "mode": "push"
                },
                "resize": true
              },
              "modes": {
                "grab": {
                  "distance": 400,
                  "line_linked": {
                    "opacity": 1
                  }
                },
                "bubble": {
                  "distance": 400,
                  "size": 40,
                  "duration": 2,
                  "opacity": 8,
                  "speed": 3
                },
                "repulse": {
                  "distance": 200
                },
                "push": {
                  "particles_nb": 4
                },
                "remove": {
                  "particles_nb": 2
                }
              }
            },
            "retina_detect": true,
            "config_demo": {
              "hide_card": false,
              "background_color": "#b61924",
              "background_image": "",
              "background_position": "50% 50%",
              "background_repeat": "no-repeat",
              "background_size": "cover"
            }
          })
      }
  
  
    }
  
  })