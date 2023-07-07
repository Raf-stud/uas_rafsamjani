<template>
  <div class="stopwatch">
    <h2>Stopwatch</h2>
    <p class="time-display">{{ formatTime }}</p>
    <div>
      <button class="stopwatch-button start-button" @click="startStopwatch" :disabled="isRunning || isTimerRunning">Start</button>
      <button class="stopwatch-button stop-button" @click="stopStopwatch" :disabled="!isRunning">Stop</button>
      <button class="stopwatch-button reset-button" @click="resetStopwatch">Reset</button>
    </div>

    <h2>Timer</h2>
    <div class="timer-group">
      <div class="timer-input">
        <div class="timer-input-column">
          <label>Hours</label>
          <input type="number" v-model="timerHours" min="0" placeholder="Hours">
        </div>
        <div class="timer-input-column">
          <label>Minutes</label>
          <input type="number" v-model="timerMinutes" min="0" max="59" placeholder="Minutes">
        </div>
        <div class="timer-input-column">
          <label>Seconds</label>
          <input type="number" v-model="timerSeconds" min="0" max="59" placeholder="Seconds">
        </div>
      </div>
      <div class="timer-buttons">
        <button class="timer-button start-button" @click="startTimer" :disabled="isTimerRunning || isRunning || !timerIsValid">Start</button>
        <button class="timer-button stop-button" @click="stopTimer" :disabled="!isTimerRunning">Stop</button>
        <button class="timer-button reset-button" @click="resetTimer">Reset</button>
      </div>
      <p v-if="isTimerRunning" class="timer-time">{{ formatTimerTime }}</p>
      <p v-else-if="timerDuration === 0" class="timer-time">00:00:00</p>
      <p v-else class="timer-time">{{ formatTimerDuration }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRunning: false,
      isTimerRunning: false,
      startTime: null,
      elapsedTime: 0,
      timerDuration: 0,
      timerStartTime: null,
      timerInterval: null,
      timerHours: 0,
      timerMinutes: 0,
      timerSeconds: 0,
      timerSavedDuration: 0,
    };
  },
  computed: {
    formatTime() {
      const milliseconds = this.elapsedTime % 1000;
      const seconds = Math.floor((this.elapsedTime / 1000) % 60);
      const minutes = Math.floor((this.elapsedTime / 60000) % 60);
      const hours = Math.floor(this.elapsedTime / 3600000);

      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
    },
    formatTimerTime() {
      const milliseconds = (this.timerDuration % 1000).toString().padStart(3, '0');
      const seconds = Math.floor((this.timerDuration / 1000) % 60).toString().padStart(2, '0');
      const minutes = Math.floor((this.timerDuration / 60000) % 60).toString().padStart(2, '0');
      const hours = Math.floor(this.timerDuration / 3600000).toString().padStart(2, '0');

      return `${hours}:${minutes}:${seconds}:${milliseconds}`;
    },
    timerIsValid() {
      return this.timerHours > 0 || this.timerMinutes > 0 || this.timerSeconds > 0;
    },
    formatTimerDuration() {
      const milliseconds = (this.timerDuration % 1000).toString().padStart(3, '0');
      const seconds = Math.floor((this.timerDuration / 1000) % 60).toString().padStart(2, '0');
      const minutes = Math.floor((this.timerDuration / 60000) % 60).toString().padStart(2, '0');
      const hours = Math.floor(this.timerDuration / 3600000).toString().padStart(2, '0');

      return `${hours}:${minutes}:${seconds}:${milliseconds}`;
    },
  },
  methods: {
    startStopwatch() {
      if (!this.isRunning) {
        this.isRunning = true;
        this.startTime = Date.now();

        this.timerInterval = setInterval(() => {
          this.elapsedTime = Date.now() - this.startTime;
        }, 10);
      }
    },
    stopStopwatch() {
      if (this.isRunning) {
        this.isRunning = false;
        clearInterval(this.timerInterval);
      }
    },
    resetStopwatch() {
      this.isRunning = false;
      clearInterval(this.timerInterval);
      this.elapsedTime = 0;
    },
    startTimer() {
      if (!this.isTimerRunning && this.timerIsValid) {
        const totalMilliseconds = (this.timerHours * 3600000) + (this.timerMinutes * 60000) + (this.timerSeconds * 1000);
        this.timerDuration = totalMilliseconds;
        this.timerStartTime = Date.now();
        this.isTimerRunning = true;

        this.timerInterval = setInterval(() => {
          const currentTime = Date.now();
          const elapsedTime = currentTime - this.timerStartTime;
          const remainingTime = this.timerDuration - elapsedTime;

          if (remainingTime <= 0) {
            this.isTimerRunning = false;
            clearInterval(this.timerInterval);
            this.timerDuration = 0;
          } else {
            this.timerDuration -= 1000; // Mengurangi 1 detik
          }
        }, 1000);
      }
    },
    stopTimer() {
      if (this.isTimerRunning) {
        this.isTimerRunning = false;
        clearInterval(this.timerInterval);
        this.timerSavedDuration = this.timerDuration; // Menyimpan nilai timerDuration saat tombol "Stop" ditekan
      }
    },
    resetTimer() {
      this.isTimerRunning = false;
      clearInterval(this.timerInterval);
      this.timerHours = 0;
      this.timerMinutes = 0;
      this.timerSeconds = 0;
      this.timerDuration = this.timerSavedDuration; // Mengembalikan nilai timerDuration ke nilai sebelumnya
      this.timerSavedDuration = 0; // Mereset nilaitimerSavedDuration
    },
  },
};
</script>

<style scoped>
.stopwatch {
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.stopwatch h2 {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
}

.stopwatch .time-display,
.stopwatch .timer-time {
  color: #333;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
}

.stopwatch input {
  margin: 0 auto;
  display: block;
  text-align: center;
  margin-bottom: 10px;
  width: 100px;
}

.stopwatch .stopwatch-button,
.stopwatch .timer-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 10px;
  color: white;
}

.stopwatch .start-button {
  background-color: #4caf50;
}

.stopwatch .stop-button {
  background-color: #f44336;
}

.stopwatch .reset-button {
  background-color: #2196f3;
}

.stopwatch .timer-group {
  margin-top: 20px;
  text-align: center;
}

.stopwatch .timer-input {
  margin-bottom: 10px;
}

.stopwatch .timer-buttons {
  text-align: center;
}

.stopwatch .timer-button.start-button {
  background-color: #4caf50;
}

.stopwatch .timer-button.stop-button {
  background-color: #f44336;
}

.stopwatch .timer-button.reset-button {
  background-color: #2196f3;
}

.stopwatch .timer-time {
  font-size: 36px;
  font-weight: bold;
  margin-top: 20px;
}

.timer-input {
  display: flex;
  justify-content: center;
}

.timer-input-column {
  margin-right: 10px;
  text-align: center;
}


</style>
