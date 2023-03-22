Component({
  
  properties: {
    audioSrc: {
      type: String,
      value: '',
    },
    displayPath: {
      type: String,
      value: '',
    },
    poster: {
      type: String,
      value: '',
    },
    songName: {
      type: String,
      value: '',
    },
    songAuthor: {
      type: String,
      value: '',
    },
  },

  data: {
    audioContext: null,
    playbackRate: 1,
    currentTime: 0,
    duration: 0,
    sliderValue: 0,
    audioUrl: '',
  },

  ready() {
    // 创建 InnerAudioContext 实例
    // const audioContext = wx.createInnerAudioContext();
    // audioContext.src = this.data.audioSrc;
    // this.setData({ audioContext });
    const audioContext = wx.createInnerAudioContext();
    this.setData({ audioContext });
  

  // 您的服务器地址，包含用户名和密码
    // const serverUrl = "https://username:password@example.com/path/to/your/audio/file.mp3";
    const serverUrl = this.data.audioSrc;
    console.log(serverUrl);
    const base64Credentials = wx.arrayBufferToBase64(new Uint8Array([...new TextEncoder().encode("kodi:Aa12345678")]));

    wx.request({
      url: serverUrl,
      header: {
        "Authorization": "Basic " + base64Credentials,
      },
      success: (res) => {
        if (res.statusCode === 200) {
          // 使用返回的音频文件URL播放音频
          this.setData({ audioUrl: serverUrl });
          audioContext.src = this.data.audioUrl;
        } else {
          console.error("获取音频文件失败");
        }
      },
      fail: function (error) {
        console.error("请求失败", error);
      },
    });
    // 添加事件监听器
    audioContext.onPlay(() => {
      console.log('音频开始播放');
    });

    audioContext.onPause(() => {
      console.log('音频暂停');
    });

    audioContext.onError((res) => {
      console.log('音频播放错误:', res);
    });

    audioContext.onEnded(() => {
      console.log('音频播放结束');
    });

    audioContext.onTimeUpdate(() => {
      this.setData({
        currentTime: audioContext.currentTime,
        duration: audioContext.duration,
      });
    });
    

    audioContext.onCanplay(() => {
      this.setData({ duration: audioContext.duration });
    });
  },

  detached() {
    // 组件卸载时，销毁音频实例
    this.data.audioContext.destroy();
  },

  methods: {
    playAudio() {
      this.data.audioContext.play();
    },

    pauseAudio() {
      this.data.audioContext.pause();
    },

    rewindAudio() {
      const newTime = Math.max(0, this.data.audioContext.currentTime - 3);
      this.data.audioContext.seek(newTime);
    },

    fastForwardAudio() {
      const newTime = Math.min(
        this.data.audioContext.duration,
        this.data.audioContext.currentTime + 3
      );
      this.data.audioContext.seek(newTime);
    },

    changePlaybackRate() {
      const newPlaybackRate = this.data.playbackRate + 0.5;
      this.data.audioContext.playbackRate = newPlaybackRate;
      this.setData({ playbackRate: newPlaybackRate });
    },

    decreasePlaybackRate() {
      const newPlaybackRate = Math.max(0.5, this.data.playbackRate - 0.5);
      this.data.audioContext.playbackRate = newPlaybackRate;
      this.setData({ playbackRate: newPlaybackRate });
    },
    resetPlaybackRate() {
      this.data.audioContext.playbackRate = 1;
      this.setData({ playbackRate: 1 });
    },
    sliderChange(e) {
      const newTime = e.detail.value;
      this.data.audioContext.seek(newTime);
    },
    methods: {
      // ...
      sliderChange(e) {
        const newTime = e.detail.value;
        this.data.audioContext.seek(newTime);
        this.setData({ currentTime: newTime });
      },
  
      sliderChanging(e) {
        const newTime = e.detail.value;
        this.setData({ sliderValue: newTime });
      },
  
      formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
      },
    },

    
  },
});
