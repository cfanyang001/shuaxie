Component({
  properties: {
    audioSrc: {
      type: String,
      value: '',
    },
  },

  data: {
    audioContext: null,
    playbackRate: 1,
  },

  ready() {
    // 创建 InnerAudioContext 实例
    const audioContext = wx.createInnerAudioContext();
    audioContext.src = this.data.audioSrc;
    this.setData({ audioContext });
  
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
      const newPlaybackRate = this.data.playbackRate === 1 ? 1.5 : 1;
      this.data.audioContext.playbackRate = newPlaybackRate;
      this.setData({ playbackRate: newPlaybackRate });
    },
  },
});
