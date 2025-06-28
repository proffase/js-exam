const { createApp } = Vue;

createApp({
  data() {
    return {
      started: false,
      seconds: 0,
      interval: null,
      finished: false,
      showSecondTimer: false,
      secondTimer: 0,
      secondInterval: null,
      showModal: false
    }
  },
  computed: {
    secondsText() {
      const n = this.seconds;
      if (n % 10 === 1 && n % 100 !== 11) return `${n} секунда`;
      if ([2,3,4].includes(n % 10) && ![12,13,14].includes(n % 100)) return `${n} секунды`;
      return `${n} секунд`;
    }
  },
  methods: {
    start() {
      this.started = true;
      this.seconds = 0;
      this.finished = false;
      this.showSecondTimer = false;
      this.secondTimer = 0;
      this.showModal = false;
      if (this.interval) clearInterval(this.interval);
      if (this.secondInterval) clearInterval(this.secondInterval);
      this.interval = setInterval(() => {
        if (this.seconds < 5) {
          this.seconds++;
        } else {
          clearInterval(this.interval);
          this.finished = true;
        }
      }, 1000);
    },
    startSecondTimer() {
      this.showSecondTimer = true;
      this.secondTimer = 0;
      if (this.secondInterval) clearInterval(this.secondInterval);
      this.secondInterval = setInterval(() => {
        if (this.secondTimer < 50) {
          this.secondTimer++;
        } else {
          clearInterval(this.secondInterval);
          this.showModal = true;
        }
      }, 100);
    },
    clearAll() {
      document.body.innerHTML = '';
    }
  },
  beforeUnmount() {
    if (this.interval) clearInterval(this.interval);
    if (this.secondInterval) clearInterval(this.secondInterval);
  }
}).mount('#app');