<template>
  <div class="kartu">
    <h1>Blackjack</h1>
    <p>Score: {{ score }}</p>
    <button @click="startGame" :disabled="gameStarted">Start Game</button>
    <div v-if="gameStarted">
      <h2>Player Hand</h2>
      <ul>
        <li v-for="(card, index) in playerHand" :key="index" class="card">
          <div class="card-content">
            <span>{{ getCardLabel(card) }}</span>
            <span class="card-symbol diamond" v-if="card.endsWith('D')">&#9830;</span>
            <span class="card-symbol heart" v-if="card.endsWith('H')">&#9829;</span>
            <span class="card-symbol club" v-if="card.endsWith('C')">&#9827;</span>
            <span class="card-symbol spade" v-if="card.endsWith('S')">&#9824;</span>
          </div>
        </li>
      </ul>
      <p>Total: {{ calculateTotal(playerHand) }}</p>
      <h2>Dealer Hand</h2>
      <ul>
        <li v-for="(card, index) in dealerHand" :key="index" class="card">
          <div class="card-content">
            <span>{{ getCardLabel(card) }}</span>
            <span class="card-symbol diamond" v-if="card.endsWith('D')">&#9830;</span>
            <span class="card-symbol heart" v-if="card.endsWith('H')">&#9829;</span>
            <span class="card-symbol club" v-if="card.endsWith('C')">&#9827;</span>
            <span class="card-symbol spade" v-if="card.endsWith('S')">&#9824;</span>
          </div>
        </li>
      </ul>
      <p>Total: {{ calculateTotal(dealerHand) }}</p>
      <button @click="hit" :disabled="gameOver">Hit</button>
      <button @click="stand" :disabled="gameOver">Stand</button>
      <p v-if="gameOver">
        Game Over! {{ result }}
        <button @click="tryAgain">Try Again</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gameStarted: false,
      gameOver: false,
      score: 0,
      initialScore: 0,
      playerHand: [],
      dealerHand: [],
      result: "",
      deck: [
        "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "QD", "KD", "AD",
        "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "QH", "KH", "AH",
        "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "JC", "QC", "KC", "AC",
        "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS", "AS"
      ]
    };
  },
  methods: {
    startGame() {
      this.gameStarted = true;
      this.gameOver = false;
      this.playerHand = [];
      this.dealerHand = [];
      this.result = "";

      // Shuffle the deck
      for (let i = this.deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
      }

      this.dealCards();
    },
    dealCards() {
      this.playerHand.push(this.deck.pop());
      this.dealerHand.push(this.deck.pop());
      this.playerHand.push(this.deck.pop());
      this.dealerHand.push(this.deck.pop());
    },
    hit() {
      this.playerHand.push(this.deck.pop());

      const playerScore = this.calculateScore(this.playerHand);
      if (playerScore > 21) {
        this.gameOver = true;
        this.result = "You Lose!";
        this.score -= 1; // Mengurangi skor jika kalah
      } else if (playerScore === 21) {
        this.score += 2; // Menambah skor jika blackjack
      }
    },
    stand() {
      while (this.calculateScore(this.dealerHand) < 17) {
        this.dealerHand.push(this.deck.pop());
      }

      const playerScore = this.calculateScore(this.playerHand);
      const dealerScore = this.calculateScore(this.dealerHand);

      if (dealerScore > 21 || playerScore > dealerScore) {
        this.result = "You Win!";
        this.score += 1; // Menambah skor jika menang
      } else if (playerScore < dealerScore) {
        this.result = "You Lose!";
        this.score -= 1; // Mengurangi skor jika kalah
      } else {
        this.result = "Push!";
      }

      this.gameOver = true;
    },
    calculateScore(hand) {
      let score = 0;
      let numAces = 0;

      for (let i = 0; i < hand.length; i++) {
        const card = hand[i];
        score += this.getCardValue(card);
        if (card.endsWith("A")) {
          numAces += 1;
        }
      }

      while (score > 21 && numAces > 0) {
        score -= 10;
        numAces -= 1;
      }

      return score;
    },
    getCardValue(card) {
      const value = card.slice(0, -1);
      if (value === "A") {
        return 11;
      } else if (value === "K" || value === "Q" || value === "J") {
        return 10;
      } else {
        return parseInt(value);
      }
    },
    getCardLabel(card) {
      const value = card.slice(0, -1);
      if (value === "A") {
        return "A";
      } else if (value === "K") {
        return "K";
      } else if (value === "Q") {
        return "Q";
      } else if (value === "J") {
        return "J";
      } else {
        return value;
      }
    },
    calculateTotal(hand) {
      let total = 0;
      for (let i = 0; i < hand.length; i++) {
        const card = hand[i];
        total += this.getCardValue(card);
      }
      return total;
    },
    tryAgain() {
      this.gameStarted = false;
      this.gameOver = false;
      this.playerHand = [];
      this.dealerHand = [];
      this.result = "";
    }
  },
  created() {
    this.initialScore = this.score;
  }
};
</script>

<style scoped>
.kartu {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
}

ul {
  padding-left: 0;
}

li {
  list-style-type: none;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  padding: 5px;
  display: inline-block;
  margin-right: 5px;
}

button {
  margin: 10px;
  padding: 10px 20px;
}

p {
  font-weight: bold;
}

.card-symbol {
  font-size: 24px;
  margin-right: 5px;
}

.diamond {
  color: red;
}

.heart {
  color: red;
}

.club {
  color: black;
}

.spade {
  color: black;
}
</style>
